const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isAdmin } = require('../../../middlewares/userTypeIdentification')
const VisionmissiongoalController = require('../../../controllers/api/VisionmissiongoalController')
const {inputEmpty} = require('../../../middlewares/validationInput/inputValidation')

router.route('/').post(passport.authenticate('jwt', { session: false}), isAdmin, inputEmpty, VisionmissiongoalController.store)
router.route('/').get(passport.authenticate('jwt', { session: false}), isAdmin, VisionmissiongoalController.show)
module.exports = router