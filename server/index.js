const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

require ('dotenv').config();

mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = process.env;
const {Job,User} = require('./models');

let secret = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
};

if(process.env.NODE_ENV != 'production') {
    secret = require('./secret');
}

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());


//Google Strategy
passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
        User.find({googleId:profile.id}, function(err,users){
            if (!users.length){
                User.create({
                    googleId: profile.id,
                    name:profile.displayName,
                    accessToken: accessToken
                }, function(err,user){
                    return cb(null, user);
                });
            } else {
                return cb(null,users[0]);
            }
        });
    }
    ));


//Bearer Strategy
passport.use(
    new BearerStrategy(
        (token, done) => {
            User.findOne({accessToken: token}, function(err, user){
                if (err) {done(err);}
                if(!user) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    )
);

//Google Auth
app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/home');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);

//get user
app.get('/api/users/:accessToken',  (req, res) => {
    User
    .findOne({accessToken: req.params.accessToken})
    .then(user =>{
        return res.json(user);
    })
    .catch(err => {
        
        res.status(500).json({error: 'Something went wrong!!!'});
    });
});

//add user to the database
app.post('/api/users', (req, res) => {
    const requiredFields = ['name'];
    for (let i = 0; i < requiredFields; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing\`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    User.create({name: req.body.name}).then(users => {
        console.log(users);
        res.status(201).json(users.apiRepr());
    }).catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

//get jobs
app.get('/api/jobs',
   passport.authenticate('bearer', {session: false}),
    (req, res) => {
        Job 
        .find({
            user:req.user._id
        })
        .then(jobs =>{
            return res.json(jobs.map(job=>job.apiRepr()));
        })
        .catch(err => {

            res.status(500).json({error: 'Something went wrong!!!'});
        });
    });

//add job to database
app.post('/api/jobs',
 passport.authenticate('bearer', {session: false}),
    (req, res) => {
        console.log(req.body);
        req.body.user=req.user._id;
        const requiredFields=['position','JobDescription','Company','NetworkingContact','Applied','LastContacted','Link','ResumeUsed','Notes'];
        for (let i=0; i<requiredFields.length;i++){
            const field=requiredFields[i];
            if (!(field in req.body)) {
                const message = `Missing \`${field}\` in request body`;
                console.error(message);
    
                return res.status(400).send(message);
            }
        }
        Job
    .create(req.body)
    .then(createdJob=> res.status(201).json(createdJob.apiRepr()))
    .catch(err =>{
        res.status(500).json({message: 'Something went wrong'});
        console.log(err);
    })
    });


 //update job 
app.put('/api/jobs/:id',
 passport.authenticate('bearer', {session: false}),
     (req, res)=>{
         if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
             res.status(400).json({
                 error: 'Request path id and request body id values must match'
             });
                
         }      

         const updated = {};
         const updateableFields = ['LastContacted','Link','ResumeUsed','Notes'];
         updateableFields.forEach(field => {
             if (field in req.body){
                 updated[field]=req.body[field];
             }
         });

         Job
    .findOneAndUpdate({
        _id:req.params.id, 
        user:req.user._id},
        {$set: updated}, {new: true})
    .exec()
    .then(updatedJob=> res.status(201).json(updatedJob.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
     });

    
//delete job
app.delete('/api/jobs/:id',
 passport.authenticate('bearer', {session: false}),
(req, res) => {
    Job
    .findOneAndRemove({
        _id:req.params.id, 
        user:req.user._id})
    .exec()
    .then(() => {
        console.log(`Deleted Job with id \`${req.params.ID}\``);
        res.status(204).end();
    });
});


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL,function(err){
            if(err){
                return reject(err);
            }
        });
        server = app.listen(port, () => {
            resolve();
        }).on('error', err=>{
            mongoose.disconnect();
            return reject(err);
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(()=>{
        return new Promise((resolve, reject) => {
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};