const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isAdmin } = require('../../../middlewares/userTypeIdentification')
const FounderController = require('../../../controllers/api/FounderController')
const upload = require('../../../middlewares/multer')
const {inputEmpty} = require('../../../middlewares/validationInput/inputValidation')

router.route('/').post(passport.authenticate('jwt', { session: false}), isAdmin, upload.single('Profile'), inputEmpty, FounderController.store)
router.route('/').get(passport.authenticate('jwt', { session: false}), isAdmin, FounderController.show)
router.route('/update/:id').get(passport.authenticate('jwt', { session: false}), isAdmin, FounderController.edit)
router.route('/update').put( passport.authenticate('jwt', { session: false}), isAdmin, upload.single('Profile'), inputEmpty, FounderController.update)
router.route('/delete/:id').delete(passport.authenticate('jwt', { session: false}), isAdmin, FounderController.destroy)
module.exports = router