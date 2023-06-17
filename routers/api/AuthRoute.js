const express = require('express')
const router = express.Router()
const {inputEmpty, emailValidation} = require('../../middlewares/validationInput/inputValidation')

const AuthController = require('../../controllers/api/AuthController')

router.route('/login').post(inputEmpty, emailValidation, AuthController.login)
// router.route('/signup').post(signup)
module.exports = router