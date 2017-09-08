import React from 'react';
import './css/create.css';
import * as actions from '../actions';
import {connect} from 'react-redux';



export class ListJobs extends React.Component {
    
constructor(props){
        super(props);
      this.props.dispatch(actions.fetchJobs())
    }
    updateJob(job){
        this.props.dispatch(actions.selectJob(job))
        console.log(job);
      
        this.props.history.push('/update');
       
    }

    deleteJob(job){
        let thisClass=this;
        this.props.dispatch(actions.deleteJob(job))
        .then (function(){
        thisClass.props.dispatch(actions.fetchJobs())
        })
        
    }
    
    render () { 
        let jobs;
    
        
        if (this.props.jobs){
            
            let updateJob = this.updateJob;
            let thisClass = this;
            let deleteJob=this.deleteJob;

        jobs= this.props.jobs.map (function (job, index) {
       return (
           
               <li key={index} > {job.position} 

               <button type="button" value="text" onClick={updateJob.bind(thisClass,job)}>Update</button>
               <button type="button" value="text" onClick={deleteJob.bind(thisClass,job)}>Delete</button> 
    
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


                   