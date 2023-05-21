const express = require('express')
const router = express.Router()

const AuthController = require('../../controllers/api/AuthController')

router.route('/login').post(AuthController.login)
// router.route('/signup').post(signup)
module.exports = router