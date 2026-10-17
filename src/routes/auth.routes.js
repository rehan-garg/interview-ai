const express = require('express')
const authRouter = express.Router()



const { registerUserController, loginUserController } = require('../controllers/auth.controller')

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login user with email, username, password
 * @access Public
 */
authRouter.post('/login', loginUserController)


module.exports = authRouter