import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Exercise from './exercise';


export default class ExerciseList extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            excercises: []
        }
    }

    componentDidMount(){
        this.getAllExercise();
    }

    getAllExercise = async () => {

        await axios.get('http://localhost:5000/excerises/')
        .then(res => { 
            if(res.data.length > 0){
                this.setState({
                    excercises: res.data
                });
            }
        })
        .catch(error => console.log(error));
        
    }

    deleteExercise  = async (id) => {

        await axios.delete('http://localhost:5000/excerises/'+id)
        .then(res => console.log(res.data))
        .catch(error => console.log(error));

        this.setState({
            excercises: this.state.excercises.filter(el => el._id !== id)
        })
    }


    render(){
        return(
            <>
                <h3 className="text-center">List of Exercise</h3>
                { 
                this.state.excercises.map(exercise => {  
                    return <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id}/>
                }) 
                }
            </>
        );
    }
}