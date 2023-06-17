const jwt = require('jsonwebtoken')
const { User } = require('../../models');
const { validatePassword } = require('../../middlewares/passwordUtils');
const asyncHandler = require('express-async-handler')

const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ 
        where:{ email: email}
    })
    if (user) {
        const passwordV2 = user.password
        if(!validatePassword(password, passwordV2)) return res.status(401).send({ password: 'Invalid account. Please enter a valid account.' })
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hour'});
        res.json({ 
            status: 200,
            user: {
                'email': user.email,
                'type': user.type
            },
            data: token
         });
    }
    else{
        return res.status(401).send({ email: 'User not found' })
    }
})
module.exports = { login }