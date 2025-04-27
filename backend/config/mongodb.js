const mongoose = require('mongoose')


async function connectToMongo() {
    await mongoose.connect('mongodb+srv://vishvassinhvihol:9099423264@cluster0.zu9ix.mongodb.net/carePoint');
    
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports =  connectToMongo