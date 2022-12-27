const mongoose = require('mongoose');

const connStr = process.env.DATABASE_CONECTION_STRING || 'mongodb://localhost:27017/booking';

module.exports = async (app) => {
    try {
        await mongoose.connect(connStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database conected')

    } catch (err) {
        console.error('Error initializing database');
        console.error(err.message);
        process.exit(1);
    }
}
