const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://syedsamihassan43:Ronaldo_7@cluster0.24ccnoq.mongodb.net/FOODORDERR?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async(callback)=>{
    await mongoose.connect(mongoURI).then(()=>{
        console.log('Connected to MongoDB');
    })
}

module.exports = {connectToMongo};