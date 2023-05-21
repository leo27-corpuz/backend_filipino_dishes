const express = require('express')
const passport = require('passport')
const cors = require('cors')
const app = express()
const handleErroFileUpload = require('./middlewares/handleErroFileUpload')
require('dotenv').config()
require('./middlewares/passport-jwt')
const { isUser, isAdmin } = require('./middlewares/userTypeIdentification')

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//routes
const AuthRoute = require('./routers/api/AuthRoute')
const LogoRoute = require('./routers/api/admin/LogoRoute')
const LandingPageRoute = require('./routers/api/admin/LandingPageRoute')
const WhoweareRoute = require('./routers/api/admin/WhoweareRoute')
const VisionmissiongoalRoute = require('./routers/api/admin/VisionmissiongoalRoute')
const FounderRoute = require('./routers/api/admin/FounderRoute')
const CategoryRoute = require('./routers/api/admin/CategoryRoute')
app.use('/api/auth', AuthRoute)

//admin route
app.use('/api/admin/logo', LogoRoute)
app.use('/api/admin/landingpage', LandingPageRoute)
app.use('/api/admin/whoweare', WhoweareRoute)
app.use('/api/admin/visionmissiongoal', VisionmissiongoalRoute)
app.use('/api/admin/founder', FounderRoute)
app.use('/api/admin/category', CategoryRoute)

app.use("/images", express.static('public/images'));


//valiate user auth
app.post('/api/isLogin', passport.authenticate('jwt', { session: false}), (req, res) =>{
    res.json(req.user);
})


app.use(handleErroFileUpload);
  
///server start
const port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log(`running port ${port}`)
})