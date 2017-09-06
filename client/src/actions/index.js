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

export const createJob = (accessToken) => {
  return dispatch => {
    return fetch('/api/jobs', {
      method: 'post',
      body: JSON.stringify(),
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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
    }).then(currentUser => {
      return dispatch(allowGetUser(currentUser), fetchJob());
    })
      .catch(error => {
        dispatch(rejectGetUser(error));
      });
  };


};



export const UPDATE_JOB = 'UPDATE_JOB';
export const updateJob = (job) => ({
  type: UPDATE_JOB,
  job
});

export const SELECT_JOB = 'SELECT_JOB';
export const selectJob = (job) => ({
  type: SELECT_JOB,
  job
});

export const DELETE_JOB = 'DELETE_JOB';
export const deleteJob = (job) => ({
  type: DELETE_JOB,
  job
});

export const FETCH_JOBS_REQUEST = 'FETCH_JOBS_REQUEST';
export const fetchJob = (job) => ({
  type: FETCH_JOBS_REQUEST,
  job
});

export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const fetchJobSuccess = (job) => ({
  type: FETCH_JOBS_SUCCESS,
  job
});

export const FETCH_JOBS_ERROR = 'FETCH_JOBS_ERROR';
export const fetchJobError = (job) => ({
  type: FETCH_JOBS_ERROR,
  job
});

// export const CREATE_JOB='CREATE_JOB';

// export function createJob(data){
//     return dispatch=>{
//         return fetch('/api/jobs',{
//             method:'post',
//             body:JSON.stringify(data),
//             headers: {
//                 "Content-Type":"application/json"
//             }
//         });
//     };
// }


//OPTION 2
// export const GET_JOBS='GET_JOBS';

// export function getJobs(jobs){
//     return{
//         type:GET_JOBS,
//         jobs
//     }
// }

// export function fetchJobs() {
//    return dispatch =>{
//     fetch('/api/jobs')
//     //     headers: {
//     //            'Authorization': `Bearer ${accessToken}`
//     //     }
//     // }).then (res => {
//     //     if (!res.ok) {
//     //         if (res.status === 401) {
//     //             Cookies.remove('accessToken');
//     //             return;
//     //         }
//     //         throw new Error(res.statusText);
//     //     }
//         //return res.json()
//     .then (res=> res.json())
//     .then(data=>dispatch(fetchJobSuccess(data.jobs)));
//     };
// }
