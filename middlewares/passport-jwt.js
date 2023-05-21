const { User } = require('../models');
const passport = require('passport')
const JwtStrategy  = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
}
passport.serializeUser((user, done) => {
    console.log(`serialize ${user.id}`)
    done(null, user.id)
})
passport.use(
    new JwtStrategy(options, async(jwt_payload, done) => {
        const user = await User.findOne({
            attributes: ['id', 'email', 'type', 'firstName', 'lastName'],
            where: {id: jwt_payload.id}
        })
        if(!user) return done(null, false)
        return done(null, user)
    })
)
