import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercises extends Component {

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


    getUsersList = async () => {

        await axios.get('http://localhost:5000/excerises/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                });
            }).catch(error => console.log(error));


        await axios.get('http://localhost:5000/users/')
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

        axios.post('http://localhost:5000/excerises/update/'+this.props.match.params.id, exercise)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));

        // this.props.history.push('/');
        window.location = '/';
    }


    render(){
        return(
            <div>
                <h3 className="text-center">Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group col-md-4">
                        <label>Username: </label>
                        <select ref="userInput"
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
                    <div className="form-group col-md-4">
                        <label>Description: </label>
                        <input type="text" className="form-control" value={this.state.description} onChange={ (e) => { this.onChangeItem("description", e.target.value) }} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Duration (in minutes): </label>
                        <input type="text" className="form-control" value={this.state.duration} onChange={(e) => { this.onChangeItem("duration", e.target.value) }} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                className="form-control"
                                selected={this.state.date}
                                onChange={(date) => { this.onChangeItem("date", date) }}
                            />
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" value="Edit Exercise" className="btn btn-primary" /> <Link to={"/"}><input type="submit" value="Cancel" className="btn btn-info" /></Link>
                    </div>
                </form>
            </div> 
        );
    }
}