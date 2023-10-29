const mongoose = require('mongoose');
const mongooseURI = "mongodb://127.0.0.1:27017/iNoteboook?tls=false";

const ConnectToMongo = ()=>{
    mongoose.connect(mongooseURI).then(()=>console.log("Connected to MongoDB"))
}

module.exports = ConnectToMongo;
