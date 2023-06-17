const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isAdmin } = require('../../../middlewares/userTypeIdentification')
const WhoweareController = require('../../../controllers/api/WhoweareController')
const upload = require('../../../middlewares/multer')
const {inputEmpty} = require('../../../middlewares/validationInput/inputValidation')
let multipleUpload = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImage', maxCount: 1 },
])
router.route('/').post(passport.authenticate('jwt', { session: false}), isAdmin, multipleUpload, inputEmpty, WhoweareController.store)
router.route('/').get(passport.authenticate('jwt', { session: false}), isAdmin, WhoweareController.show)
module.exports = router