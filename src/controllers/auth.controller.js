const { model } = require('mongoose')
const userModel = require('../models/user.model')
const User = require('../models/user.model')


async function registerUserContoller(req, res) {
    const {username, email, password} = req.body

    // if any of the field is empty
    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    // finding if the user already exists with this email or username
    const userExists = User.findOne({
        $or: [{username}, {email}]
    })

    // if user exists return response
    if(userExists) {
        return res.status(400).json({
            message: "Account already exists with username or email"
        })
    }

    
}



module.exports = {
    registerUserContoller,
}