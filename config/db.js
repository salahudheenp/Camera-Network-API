const mongoose = require('mongoose')



module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    try {
        mongoose.connect("mongodb://localhost:27017", connectionParams)
        console.log('Connected to database successfully.....');
    } catch (error) {
        console.log(error);
        console.log('Could not connected to database..');
    }
}   
