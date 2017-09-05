import * as actions from '../actions';

describe('requestGetUser()', () => {
    it('should return the action', () => {
        const action = actions.requestGetUser();
        expect(action.type).toEqual(actions.REQUEST_GET_USER);
    });
});


describe('AllowGetUser()', () => {
    it('should return the action', () => {
        const action = actions.allowGetUser();
        expect(action.type).toEqual(actions.ALLOW_GET_USER);
    });
});

describe('rejectGetUser()', () => {
    it('should return the action', () => {
        const action = actions.rejectGetUser();
        expect(action.type).toEqual(actions.REJECT_GET_USER);
    });
});

//CHECK THE TEST
describe('getUser()', () => {
    it('should return the action', () => {
        const action = actions.getUser();
        expect(action.type).toEqual(actions.GET_USER);
    });
});


describe('createJob()', () => {
    it('should return the action', () => {
        const action = actions.createJob();
        expect(action.type).toEqual(actions.CREATE_JOB);
    });
});



describe('updateJob()', () => {
    it('should return the action', () => {
        const action = actions.updateJob();
        expect(action.type).toEqual(actions.UPDATE_JOB);
    });
});


describe('selectJob()', () => {
    it('should return the action', () => {
        const action = actions.selectJob();
        expect(action.type).toEqual(actions.SELECT_JOB);
    });
});


describe('deleteJob()', () => {
    it('should return the action', () => {
        const action = actions.deleteJob();
        expect(action.type).toEqual(actions.DELETE_JOB);
    });
});


describe('fetchJob()', () => {
    it('should return the action', () => {
        const action = actions.fetchJob();
        expect(action.type).toEqual(actions.FETCH_JOBS_REQUEST);
    });
});


describe('fetchJobSuccess()', () => {
    it('should return the action', () => {
        const action = actions.fetchJobSucces();
        expect(action.type).toEqual(actions.FETCH_JOBS_SUCCESS);
    });
});

describe('fetchJobError()', () => {
    it('should return the action', () => {
        const action = actions.fetchJobError();
        expect(action.type).toEqual(actions.FETCH_JOBS_ERROR);
    });
});
