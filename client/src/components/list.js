import React from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-materialize';
import './css/list.css';
import {Collection, CollectionItem} from 'react-materialize';



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
           
               <CollectionItem key={index} > {job.position} 
                <div>
               <Button waves='light' value="text" class="light" onClick={updateJob.bind(thisClass,job)}>Update</Button>
               <Button waves='light' value="text" class="light" onClick={deleteJob.bind(thisClass,job)}>Delete</Button> 
               </div>
               </CollectionItem>     
       )   
        })
    }

    return (
        <Collection>
            {jobs}
        </Collection>);
    }

}



const mapStateToProps=state=>({
    jobs: state.jobs,
});
export default connect(mapStateToProps)(ListJobs);


                   