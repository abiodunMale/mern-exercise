import { BrowserRouter as Router, Route  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Navbar from './components/navbar';
import ExercisesList from './components/exercises-list';
import EditExercises from './components/edit-exercises';
import CreateExercises from './components/create-exercises';
import CreateUser from './components/create-user';


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercises} />
        <Route path="/create" component={CreateExercises} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
