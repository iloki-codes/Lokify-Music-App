const mongoose = require('mongoose');

module.exports = async () => {
    {}
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to database successfully');
    } catch (error) {
        console.log('could not connect to database !');
        
    }
}