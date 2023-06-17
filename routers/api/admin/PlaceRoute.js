const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isAdmin } = require('../../../middlewares/userTypeIdentification')
const PlaceController = require('../../../controllers/api/PlaceController')

// router.route('/').post(passport.authenticate('jwt', { session: false}), isAdmin, inputEmpty, PlaceController.store)
router.route('/').get(passport.authenticate('jwt', { session: false}), isAdmin, PlaceController.index)

module.exports = router