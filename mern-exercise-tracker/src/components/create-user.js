import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            loading: false
        }
    }

    onChangeItem(item, value){
        // console.log(value);
        this.setState({ [item]:  value });
    }

    onSubmit(e){
        e.preventDefault();
        
        this.setState({ loading: true })

        const user = {
            username: this.state.username
        }

        axios.post('http://localhost:5000/users/add', user)
        .then(res => {
            
            console.log(res.data);

            if(res.data.success === true){
                this.setState({ loading: false, username: '' });
                alert(res.data.msg);
            }else{
                alert("error while saving");
            }

        })
        .catch(error => console.log(error));
        
        // window.location = '/';
    }

    render(){
        return(
            <div>
               <h3 className="text-center" >Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group col-md-4">
                        <label>Username: </label>
                        <input type="text" className="form-control" value={this.state.username} onChange={ (e) => { this.onChangeItem("username", e.target.value) }} required/>
                    </div>
                    <div className="form-group col-md-4">
                       {this.state.loading ? <h4>Saving...</h4> : <input type="submit" value="Create User" className="btn btn-primary" /> } 
                    </div>
                </form>
            </div> 
        );
    }
}