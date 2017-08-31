const mongoose = require('mongoose');


const jobSchema = mongoose.Schema({
    position: {type: String, required: true},
    JobDescription: {type: String, required: true},
    Company:{type: String, required: true},
    NetworkingContact:{type: String, required: true},
    Applied:{type: String, required: true},
    LastContacted:{type: String, required: true},
    Link:{type: String, required: true},
    ResumeUsed:{type: String, required: true},
    Notes:{type: String, required: true}
});

jobSchema.methods.apiRepr = function() {
    return {
        position: this.position,
        JobDescription: this.JobDescription,
        Company:this.Company,
        NetworkingContact:this.NetworkingContact,
        Applied:this.Applied,
        LastContacted:this.LastContacted,
        Link:this.Link,
        ResumeUsed:this.ResumeUsed,
        Notes:this.Notes
    };
};

const Job = mongoose.model('Job', jobSchema);


const userSchema = mongoose.Schema({
    googleId: {type: String, required: true},
    name: {type: String, required: true},
    accessToken: {type: String, required: true},
});

userSchema.methods.apiRepr = function() {
    return {
        name: this.name
    };
};

const User = mongoose.model('User', userSchema);


module.exports = {Job,User};
