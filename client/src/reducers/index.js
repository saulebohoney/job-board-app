import * as actions from '../actions';


const initialState = {
    currentUser: {username:'saule', password:'password'},
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
        return Object.assign({},state,{currentUser: action.currentUser,getUser:false});
    case actions.REJECT_GET_USER:
        return Object.assign({},state,{error: action.error,getUser: false});
    case actions.FETCH_JOBS_REQUEST:
        return  Object.assign({}, state, {loading: true});
    case actions.FETCH_JOBS_SUCCESS:
        return Object.assign({}, state, {restaurants: action.restaurant});
    case actions.FETCH_JOBS_ERROR:
        return Object.assign({}, state, {city: action.location});
    case actions.CREATE_JOB:
        return Object.assign({}, state, {
            jobs: [...state.jobs, action.job]
        });
    case actions.UPDATE_JOB:
        return Object.assign({}, state, {
            items: state.items.map(item =>
                item.id === action.item.id ? action.item : item
            )
        });
    case actions.SELECT_JOB:
        return Object.assign({}, state, {
            job: action.job   
        });
    case actions.DELETE_JOB:
        return Object.assign({}, state, {
            items: state.items.filter(item => item.id !== action.item.id)
        });    
    default:
        return state;
    }
};