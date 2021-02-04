const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exceriseSchema = new Schema({
    username : { type: String, required: true},
    description : { type: String, required: true},
    duration : { type: Number, required: true},
    date : { type: Date, required: true},
    },{
    timestamps: true
});

const Excerise = mongoose.model('Excerise', exceriseSchema);

module.exports =  Excerise;