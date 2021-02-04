const express = require('express');
const cors =  require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const exceriseRouter = require('./routes/excerises');
const userRouter = require('./routes/users');

app.use(cors());
app.use(express.json());


const uri = process.env.CONNECTION_STRING;
mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use('/users', userRouter);
app.use('/excerises', exceriseRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
