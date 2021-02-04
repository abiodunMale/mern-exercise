const exerciseModel = require('../models/ExceriseModel');

exports.Index = async (req, res) => {

    try {

        const allExcerise = await  exerciseModel.find();
        res.status(200).json(allExcerise);
        
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

exports.addExcerise = async (req, res) => {
    
    // const username = req.body.username;
    // const description = req.body.description;
    // const duration = req.body.duration;
    // const date = req.body.date;
    const exercise = req.body;

    const addExcerise= new exerciseModel(exercise);

    try {
        
        await addExcerise.save();
        res.status(200).json({msg : "succesfullly added excerises!!!", data: addExcerise});

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

exports.GetExercise = async (req, res) => {

    const {id} = req.params;

    try {

        const excersie = await exerciseModel.findById(id);
        res.status(200).json(excersie);

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

exports.DeleteExercise = async (req, res) => {

    const {id} = req.params;

    try {

        await exerciseModel.findByIdAndDelete(id);
        res.status(200).json({msg: "Successfully deleted"});
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }

}

exports.UpdateExercise = async (req, res) => {

    const {id} = req.params;
    const excerise = req.body;

    try {

        const updatedexcerise = await exerciseModel.findByIdAndUpdate(id, excerise, { new: true });
        res.status(200).json({msg: "Successfully updated!!!", data: updatedexcerise});
        
    } catch (error) {
        res.status(404).json({ message: error.message});
        
    }
}

