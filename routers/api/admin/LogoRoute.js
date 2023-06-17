const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isAdmin } = require('../../../middlewares/userTypeIdentification')
const LogoController = require('../../../controllers/api/LogoController')
const {inputEmpty} = require('../../../middlewares/validationInput/inputValidation')

router.route('/').post(passport.authenticate('jwt', { session: false}), isAdmin, inputEmpty, LogoController.store)
router.route('/').get(passport.authenticate('jwt', { session: false}), isAdmin, LogoController.show)
module.exports = router