const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isAdmin } = require('../../../middlewares/userTypeIdentification')
const DishController = require('../../../controllers/api/DishController')

// router.route('/').post(passport.authenticate('jwt', { session: false}), isAdmin, inputEmpty, PlaceController.store)
router.route('/').get(DishController.index)

module.exports = router