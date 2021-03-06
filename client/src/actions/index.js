import * as Cookies from 'js-cookie';

export const REQUEST_GET_USER = 'REQUEST_GET_USER';
export const requestGetUser = () => ({
    type: REQUEST_GET_USER
});

//Retrieve the user once OAuth is successful
export const ALLOW_GET_USER = 'ALLOW_GET_USER';
export const allowGetUser = (jobs) => ({
    type: ALLOW_GET_USER,
    jobs
});

export const REJECT_GET_USER = 'REJECT_GET_USER';
export const rejectGetUser = (error) => ({
    type: REJECT_GET_USER,
    error
});
export const GET_USER = 'GET_USER';
export const getUser = (accessToken) => dispatch => {
    dispatch(requestGetUser());
    return fetch('/api/jobs', {

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
    }).then(jobs => {
        return dispatch(allowGetUser(jobs));
    }).catch(error => {
        dispatch(rejectGetUser(error));
    });
};

export const CREATE_JOB = 'CREATE_JOB';
export const createJob = (job) => {
    return dispatch => {
        return fetch('/api/jobs', {
            method: 'post',
            body: JSON.stringify(job),
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                'Content-Type': 'application/json'
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
        }).then(currentJob => {
            return dispatch(allowGetUser(currentJob), fetchJob());
        })
            .catch(error => {
                dispatch(rejectGetUser(error));
            });
    };


};



export const UPDATE_JOB = 'UPDATE_JOB';
export const updateJob = (job) => {
    return dispatch =>{
    return fetch(`/api/jobs/${job.id}`, {
        method: 'put',
        body: JSON.stringify(job),
        headers: {
            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
            'Content-Type': 'application/json'
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
    }).then(job => {
        return dispatch(updateJobSuccess(job));
    })
        .catch(error => {
            dispatch(updateJobError(error));
        });
};
};

export const SELECT_JOB = 'SELECT_JOB';
export const selectJob = (job) => ({
    type: SELECT_JOB,
    job
});

export const DELETE_JOB = 'DELETE_JOB';
export const deleteJob = (job) => {
    return dispatch =>{
        return fetch(`/api/jobs/${job.id}`, {
            method: 'delete',
            body: JSON.stringify(job),
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                'Content-Type': 'application/json'
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
        }).then(job => {
            return dispatch(deleteJobSuccess(job));
        })
            .catch(error => {
                dispatch(deleteJobError(error));
            });
    };
    };

export const FETCH_JOBS_REQUEST = 'FETCH_JOBS_REQUEST';
export const fetchJob = (job) => ({
    type: FETCH_JOBS_REQUEST,
    job
});

export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const fetchJobSuccess = (jobs) => ({
    type: FETCH_JOBS_SUCCESS,
    jobs
});

export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const updateJobSuccess = (job) => ({
    type: UPDATE_JOB_SUCCESS,
    job
});

export const UPDATE_JOB_ERROR = 'UPDATE_JOB_ERROR';
export const updateJobError = (error) => ({
    type: UPDATE_JOB_ERROR,
    error
});

export const FETCH_JOBS_ERROR = 'FETCH_JOBS_ERROR';
export const fetchJobError = (error) => ({
    type: FETCH_JOBS_ERROR,
    error
});
export function fetchJobs(jobs) {
   return dispatch =>{
    return fetch('/api/jobs', {
        method: 'get',
        body: JSON.stringify(jobs),
        headers: {
            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) {
            if (res.status === 401) {
                Cookies.remove('accessToken');
                return;
            }
            throw new Error(res.statusText);
        }
        return res.json(jobs);
    }).then(jobs => {
        return dispatch(fetchJobSuccess(jobs));
    })
        .catch(error => {
            dispatch(fetchJobError(error));
        });
};


};
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const deleteJobSuccess = (job) => ({
    type: DELETE_JOB_SUCCESS,
    job
});

export const DELETE_JOB_ERROR = 'DELETE_JOB_ERROR';
export const deleteJobError = (error) => ({
    type: DELETE_JOB_ERROR,
    error
});