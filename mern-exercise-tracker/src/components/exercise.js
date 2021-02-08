import { Link } from 'react-router-dom';


const Exercise = ({exercise, deleteExercise }) => {
    return(
        <div className="card" style={{padding: 30, marginBottom: 10}}>
            <div className="row">
                <div className="col-md-11">
                    User<h5>{exercise.username}</h5>
                    Description<h5>{exercise.description}</h5>
                    Duration<h5>{exercise.duration}</h5>
                    Date<h5>{exercise.date.substring(0, 10)}</h5>
                </div>
                <div className="col-md-1" style={{ marginTop: 50 }}>
                    <Link to={"/edit/"+exercise._id}><button className="btn btn-info" >edit</button></Link>
                    <p></p>
                    <button onClick={() => deleteExercise(exercise._id)} className="btn btn-danger">del</button>
                </div>
            </div>
        </div>
        
    );
};


Exercise.defaultProps = {
    title: 'Exercise'
}


export default Exercise;