import * as actions from '../actions';


const initialState = {
    currentUser:null,
    getUser: false, //If user tries to use an access token get them
    error: null, //If user has bad credentials reject them
    jobs:[],
    job:null,
    loading:false
};

export const reducer = (state=initialState,action) => {
    switch (action.type){

    case actions.REQUEST_GET_USER:
        return Object.assign({},state,{getUser:true});

    case actions.ALLOW_GET_USER:
        return Object.assign({},state,{jobs: action.jobs,getUser:false});

    case actions.REJECT_GET_USER:
        return Object.assign({},state,{error: action.error,getUser: false});

    case actions.FETCH_JOBS_REQUEST:
        return  Object.assign({}, state, {loading: true});

    case actions.FETCH_JOBS_SUCCESS:
        return Object.assign({}, state, {jobs: action.job});

    case actions.FETCH_JOBS_ERROR:
        return Object.assign({}, state, {jobs: action.job});

    case actions.CREATE_JOB:
        return Object.assign({}, state, {
            jobs: [...state.jobs, action.job]
        });
    case actions.UPDATE_JOB:
        return Object.assign({}, state, {
            jobs: state.jobs.map(job=>
                job.id === action.job.id ? action.job : job
            )
        });
    case actions.SELECT_JOB:
        return Object.assign({}, state, {
            job: action.job   
        });
    case actions.DELETE_JOB:
        return Object.assign({}, state, {
            jobs: state.jobs.filter(job => job.id !== action.job.id)
        });    

    default:
        return state;
    }
};