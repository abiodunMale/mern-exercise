const userModel = require('../models/UserModel');

exports.Index = async (req, res) => {

    try {
        const allUsers = await  userModel.find();
        res.status(200).json(allUsers);
        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

exports.addUser = async (req, res) => {
    
    const post = req.body;
    const addUser = new userModel(post);

    try {

        await addUser.save();
        res.status(201).json({ success: true, msg: "User added!!!", data: addUser});
    } catch (error) {
        res.status(409).json({ message: error.message});
    }

}