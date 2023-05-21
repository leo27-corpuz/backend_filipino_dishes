const bcrypt = require('bcryptjs'); //encrptable
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}
const validatePassword = (passwordV1, passwordV2) => {
    return bcrypt.compareSync(passwordV1, passwordV2);
}
module.exports = { hashPassword, validatePassword }