const User = require('../models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerUserController(req, res) {
    const {username, email, password} = req.body

    // if any of the field is empty
    if(!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    // finding if the user already exists with this email or username
    const userExists = await User.findOne({
        $or: [{username}, {email}]
    })

    // if user exists return response
    if(userExists) {
        return res.status(400).json({
            message: "Account already exists with username or email"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username, 
        email,
        password: hashedPassword
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginUserController(req, res) {
    const {username, email, password} = req.body

    if(!username && !email) {
        return res.status(400).json({
            message: "Please enter username or email"
        })
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user) {
        return res.status(400).json({
            message: "Invalid username or email"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.cookie("token", token)

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController
}