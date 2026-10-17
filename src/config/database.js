const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    
        console.log(`Connected to database successfully`)
    } catch (error) {
        console.log(`Connection to database failed !! :: `, error)
    }
}

module.exports = connectDB