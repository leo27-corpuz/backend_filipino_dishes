const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isAdmin } = require('../../../middlewares/userTypeIdentification')
const LandingPageController = require('../../../controllers/api/LandingPageController')
const upload = require('../../../middlewares/multer')
const {inputEmpty} = require('../../../middlewares/validationInput/inputValidation')

let multipleUpload = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImage', maxCount: 1 },
])
router.route('/').post(passport.authenticate('jwt', { session: false}), isAdmin, multipleUpload, inputEmpty, LandingPageController.store)
router.route('/').get(passport.authenticate('jwt', { session: false}), isAdmin, LandingPageController.show)
module.exports = router