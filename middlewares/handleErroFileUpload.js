const multer = require('multer');
const handleErrorFileUpload = (err, req, res, next) => {
    return res.status(400).send(err.message);
}
module.exports = handleErrorFileUpload