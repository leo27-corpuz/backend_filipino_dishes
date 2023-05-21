const multer = require('multer');
const path = require('path')
const crypto = require('crypto');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const randomCode = crypto.randomBytes(20).toString('hex');
        cb(null, randomCode + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ 
    storage: storage,  
    fileFilter: (req, file, cb) => {
        let filename = file.mimetype.toLocaleLowerCase()
        if (filename == 'image/jpeg' || filename == 'image/png' || filename == 'image/jpeg') {
            cb(null, true);
        }
        else{
            return cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
        }
    },
});
module.exports = upload