import * as Cookies from 'js-cookie';

export const REQUEST_GET_USER='REQUEST_GET_USER';
export const requestGetUser=()=>({
    type: REQUEST_GET_USER
});
//Retrieve the user once OAuth is successful
export const ALLOW_GET_USER='ALLOW_GET_USER';
export const allowGetUser=(currentUser)=>({
    type: ALLOW_GET_USER,
    currentUser
});

export const REJECT_GET_USER='REJECT_GET_USER';
export const rejectGetUser=(error)=>({
    type: REJECT_GET_USER,
    error
});
export const GET_USER='GET_USER';
export const getUser=(accessToken)=>dispatch=>{
    dispatch(requestGetUser());
    return fetch('/api/questions', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(res => {
        if (!res.ok) {
            if (res.status === 401) {
                Cookies.remove('accessToken');
                return;
            }
            throw new Error(res.statusText);
        }
        return res.json();
    }).then(currentUser=>{
        return dispatch(allowGetUser(currentUser));
    })
        .catch(error=>{
            dispatch(rejectGetUser(error));
        });
};

export const CREATE_JOB='CREATE_JOB';
export const createJob=(job)=>({
    type: CREATE_JOB,
    job
});

export const UPDATE_JOB='UPDATE_JOB';
export const updateJob=(job)=>({
    type: UPDATE_JOB,
    job
});

export const SELECT_JOB='SELECT_JOB';
export const selectJob=(job)=>({
    type: SELECT_JOB,
    job
});

export const DELETE_JOB='DELETE_JOB';
export const deleteJob=(job)=>({
    type: DELETE_JOB,
    job
});

export const FETCH_JOBS_REQUEST='FETCH_JOBS_REQUEST';
export const fetchJob=(job)=>({
    type:FETCH_JOBS_REQUEST,
    job
});

export const FETCH_JOBS_SUCCESS='FETCH_JOBS_SUCCESS';
export const fetchJobSucces=(job)=>({
    type:FETCH_JOBS_SUCCESS,
    job
});

export const FETCH_JOBS_ERROR='FETCH_JOBS_ERROR';
export const fetchJobError=(job)=>({
    type:FETCH_JOBS_ERROR,
    job
});