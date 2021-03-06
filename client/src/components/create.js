import React from 'react';
//import * as Cookies from 'js-cookie';
import './css/create.css';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-materialize';

export class CreateJob extends React.Component {
  
createJob  (e) {
    e.preventDefault()
    let job={
        position:this.position.value,
        JobDescription:this.JobDescription.value,
        Company:this.Company.value,
        NetworkingContact:this.NetworkingContact.value,
        Applied:this.Applied.value,
        LastContacted:this.LastContacted.value,
        Link:this.Link.value,
        ResumeUsed:this.ResumeUsed.value,
        Notes:this.Notes.value
    }
    this.props.dispatch(actions.createJob(job));
    console.log(job)
    this.props.history.push('/list');
}


render() {
    return (
        <div className="createJob">       
            <form onSubmit={this.createJob.bind(this)}>
                <label htmlFor="Position"></label>
                <input type="text" placeholder="Position" required
                ref={(input) => { this.position = input; }} />
               <br></br>

    
                <label htmlFor="JobDescription"></label>
                <input type="text" placeholder="Job Description" required
                ref={(input) => { this.JobDescription = input; }} />
                  <br></br>

           
                <label htmlFor="Company"></label>
                <input type="text" placeholder="Company" required
                ref={(input) => { this.Company = input; }} />
               <br></br>

            
                <label htmlFor="NetworkingContact"></label>
                <input type="text" placeholder="Networking Contact" required
                ref={(input) => { this.NetworkingContact = input; }} />
                 <br></br>

             
                <label htmlFor="Applied"></label>
                <input type="date" placeholder="Applied" required
                ref={(input) => { this.Applied = input; }} />
                 <br></br>

     
                <label htmlFor="LastContacted">Last Contacted</label> 
                <input type="date" placeholder="Last contacted dd/mm" required
                ref={(input) => { this.LastContacted = input; }} />
                <br></br>

             
                <label htmlFor="Link"></label>
                <input type="text" placeholder="Link" required
                ref={(input) => { this.Link = input; }} />
                <br></br>
 
      
                <label htmlFor="ResumeUsed"></label>
                <input type="text" placeholder="Resume used" required
                ref={(input) => { this.ResumeUsed= input; }} />
                 <br></br>

                <label htmlFor="Notes"></label>
                <input type="text" placeholder="Notes" required
                ref={(input) => { this.Notes= input; }} />
                 <br></br>
  
                 <Button waves='light' class='light'><input type="submit"  value="Submit"/></Button>
  
                </form>
                </div>
    )
}

}
export default connect()(CreateJob);

