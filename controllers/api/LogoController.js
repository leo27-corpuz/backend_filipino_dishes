const { Logo } = require('../../models');
const asyncHandler = require('express-async-handler')

const store = asyncHandler(async (req, res) => {
    // let str = data.title.replace(/(?:\r\n|\r|\n)/g, '<br>'); //with line break
    let logoInfo = {
        title: req.body.title,
    }
    if(!logoInfo.title) return res.status(500).send({ error: 'Please Complete the fields' })
    
    //check if already have logo
    const logo = await Logo.findAll();
    if(logo.length === 1){
        let updatelogo = await Logo.findOne({
            where:{
                id: logo[0].id
            },
        })
        updatelogo.title = logoInfo.title
        const newLogoUpdated = await updatelogo.save({
            attributes: ['title']
        });
        res.status(200).send(newLogoUpdated.title)
    }
    else{
        const newlogo = await Logo.create(logoInfo)
        res.status(200).send(newlogo.title)
    }
})
const show = asyncHandler(async (req, res) => {
    const logo = await Logo.findAll({
         attributes: ['title']
    });
    res.send(logo)
})
module.exports = { store, show }