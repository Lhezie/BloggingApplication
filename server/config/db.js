const mongoose = require('mongoose')
require('dotenv').config()

// Connect to MongoDB
const connectDB = async () => { 
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connection established at ${conn.connection.host}`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
        // process.exit(1)
    }
}
module.exports = connectDB;