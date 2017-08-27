import React from 'react';
import './css/create.css';
import * as actions from '../actions';
import {connect} from 'react-redux';

export class ListJobs extends React.Component {

    updateJob(job){
        this.props.dispatch(actions.selectJob(job));
    }
    
    render () { 
        let jobs;
    
        
        if (this.props.jobs){
            let updateJob = this.updateJob;
            let thisClass = this;

        jobs= this.props.jobs.map (function (job) {
       return (
               <li> {job.position} 
               <button type="button" value="text" onClick={updateJob.bind(thisClass,job)}>update</button> 
               </li>     
       )   
        })
    }

    return (
        <div>
       {jobs}
        </div>);
    }

}


const mapStateToProps=state=>({
    jobs: state.jobs,
});
export default connect(mapStateToProps)(ListJobs);


                   