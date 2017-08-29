import React from 'react';
//import * as Cookies from 'js-cookie';
import './css/create.css';
import * as actions from '../actions';
import {connect} from 'react-redux';



export class UpdateJob extends React.Component {
  
updateJob  (e) {
    e.preventDefault()
    let job={
        position:this.positionInput.value,
        JobDescription:this.JobDescription.value,
        Company:this.Company.value,
        NetworkingContact:this.NetworkingContact.value,
        Applied:this.Applied.value,
        LastContacted:this.LastContacted.value,
        Link:this.Link.value,
        ResumeUsed:this.ResumeUsed.value,
        Notes:this.Notes.value
    }
    this.props.dispatch(actions.updateJob(job));
    console.log(job)
    this.props.history.push('/list');
}

componentDidMount(){
   if (this.props.job) 
    { 
        this.positionInput.value= this.props.job.position;
        //this.positionInput.value= this.props.job.position;
   }
}



render() {
    return (
        <div className="UpdateJob">
            <form onSubmit={this.updateJob.bind(this)}>
                <label htmlFor="Position"></label>
                <input type="text" placeholder="Position"
                ref={(input) => { this.positionInput = input; }} />
               <br></br>

    
                <label htmlFor="JobDescription"></label>
                <input type="text" placeholder="Job Description"
                ref={(input) => { this.JobDescription = input; }} />
                  <br></br>

           
                <label htmlFor="Company"></label>
                <input type="text" placeholder="Company"
                ref={(input) => { this.Company = input; }} />
               <br></br>

            
                <label htmlFor="NetworkingContact"></label>
                <input type="text" placeholder="Networking Contact"
                ref={(input) => { this.NetworkingContact = input; }} />
                 <br></br>

             
                <label htmlFor="Applied"></label>
                <input type="text" placeholder="Applied"
                ref={(input) => { this.Applied = input; }} />
                 <br></br>

     
                <label htmlFor="LastContacted"></label>
                <input type="text" placeholder="Last contacted dd/mm"
                ref={(input) => { this.LastContacted = input; }} />
                <br></br>

             
                <label htmlFor="Link"></label>
                <input type="text" placeholder="Link"
                ref={(input) => { this.Link = input; }} />
                <br></br>
 
      
                <label htmlFor="ResumeUsed"></label>
                <input type="text" placeholder="Resume used"
                ref={(input) => { this.ResumeUsed= input; }} />
                 <br></br>

                 <label htmlFor="Notes"></label>
                <input type="text" placeholder="Notes"
                ref={(input) => { this.Notes= input; }} />
                 <br></br>
  
               <input type="submit" value="Update"/>

                </form>
          
                </div>
    )
}

}
const mapStateToProps=state=>({
    job: state.job
});
export default connect(mapStateToProps)(UpdateJob);


