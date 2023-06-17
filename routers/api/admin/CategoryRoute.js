const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isAdmin } = require('../../../middlewares/userTypeIdentification')
const CategoryController = require('../../../controllers/api/CategoryController')
const upload = require('../../../middlewares/multer')
const {inputEmpty} = require('../../../middlewares/validationInput/inputValidation')

let multipleUpload = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subMainImage', maxCount: 1 },
    { name: 'subImage1', maxCount: 1 },
    { name: 'subImage2', maxCount: 1 },
])

router.route('/').post(passport.authenticate('jwt', { session: false}), isAdmin, multipleUpload, inputEmpty, CategoryController.store)
router.route('/').get(passport.authenticate('jwt', { session: false}), isAdmin, CategoryController.index)
router.route('/delete/:id').delete(passport.authenticate('jwt', { session: false}), isAdmin, CategoryController.destroy)
module.exports = router