const User = require('../models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require('../models/blacklist.model')

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

    if(!password) {
        return res.status(400).json({
            message: "Please enter password"
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

async function logoutUserController(req, res) {
    const token = req.cookies?.token

    if(token) {
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie('token')

    res.status(200).json({
        message: "User logged out successfully"
    })
}

async function getMeUserController(req, res) {
    const user = await User.findById(req.user.id)

    return res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            email: user.email,
            username: user.username
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeUserController
}