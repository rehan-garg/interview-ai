const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already in use"],
        required: true,
    },

    email: {
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User