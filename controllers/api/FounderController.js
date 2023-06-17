const { Founder } = require('../../models');
const { deletiongProcess } = require('../../middlewares/deletingContent/deletingImages')
const asyncHandler = require('express-async-handler')

const store = asyncHandler(async(req, res) => {
    const dataText = {
        Name: req.body.Name,
        Position: req.body.Position,
        Description: req.body.Description
    }
    const profile = req.file;
    dataText.Profile = profile.filename
    let newFounder = await Founder.create(dataText)
    res.status(200).send(newFounder)
})
const edit = asyncHandler(async(req, res) => {
    const { id } = req.params
    if(!id){
        res.status(404).send('not found')
    }else{
        let searchFounder = await Founder.findByPk(id)
        if(searchFounder === null) return res.status(404).send('not found')
        res.send(searchFounder)
    }
})
const update = asyncHandler(async(req, res) => {
    const id = req.body.id
    const dataText = {
        Name: req.body.Name,
        Position: req.body.Position,
        Description: req.body.Description
    }
    const profile = req.file;

    //check if exist
    let founder = await Founder.findByPk(id)
    if (founder === null) return res.status(404).send('Founder Not Found')
    else {
        if (profile) {
            deletiongProcess(founder.Profile)
            await founder.update({
                Profile: profile.filename
            })
        }
        let updatefounder = await founder.update(dataText)
        res.send(updatefounder)
    }
})
const show = asyncHandler(async(req, res) => {
    let founders = await Founder.findAll({
        order:[
            ['id', 'DESC']
        ]
    })
    res.send(founders)
})
const destroy = asyncHandler(async(req, res) => {
    const { id } = req.params
    if(!id){
        res.status(404).send('not found')
    }else{
        let searchFounder = await Founder.findByPk(id)
        if(searchFounder === null) return res.status(404).send('not found')
        deletiongProcess(searchFounder.Profile)
        await searchFounder.destroy()
        res.status(200).send('success')
    }
})
module.exports = { store, edit, update, show, destroy}