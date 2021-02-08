import React, { Component } from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercises extends Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        // this.onChangeItem = this.onChangeItem.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount(){
        this.getUsersList();
    }


    getUsersList(){

        axios.get('http://localhost:5000/users/')
        .then(response => {

            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                });
            }

        }).catch(error => console.log(error) );

    }


    onChangeItem(item, value){
        // console.log(value);
        this.setState({ [item]:  value });
    }

    onSubmit(e){

        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/excerises/add', exercise)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));

        window.location = '/';
    }


    render(){
        return(
            <div>
                <h3 className="text-center">Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group col-md-6">
                        <label>Username: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={(e) => { this.onChangeItem("username", e.target.value) }}>
                            {
                                this.state.users.map((user) => {
                                    return <option key={user} value={user} >{user} </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Description: </label>
                        <input type="text" className="form-control" value={this.state.description} onChange={ (e) => { this.onChangeItem("description", e.target.value) }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Duration (in minutes): </label>
                        <input type="text" className="form-control" value={this.state.duration} onChange={(e) => { this.onChangeItem("duration", e.target.value) }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                className="form-control"
                                selected={this.state.date}
                                onChange={(date) => { this.onChangeItem("date", date) }}
                            />
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <input type="submit" value="Create Exercise" className="btn btn-primary" />
                    </div>
                </form>
            </div> 
        );
    }
}