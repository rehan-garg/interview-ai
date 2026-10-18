const express = require('express')
const authRouter = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')


const { 
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeUserController
} = require('../controllers/auth.controller')

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post('/register', registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login user with email, username, password
 * @access public
 */
authRouter.post('/login', loginUserController)


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookies and add the token in blacklist
 * @access public
 */
authRouter.get('/logout', logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get('/get-me', authMiddleware.authUser, getMeUserController)

module.exports = authRouter