const { Whoweare } = require('../../models');
const { deletingImages, deletiongProcess } = require('../../middlewares/deletingContent/deletingImages')
const asyncHandler = require('express-async-handler')

const store = asyncHandler(async(req, res) => {
    const dataText = {
        title: req.body.title,
        description: req.body.description,
    }
    const mainImage = req.files.mainImage;
    const subImage = req.files.subImage;

    const whowearedata = await Whoweare.findAll();
    if(whowearedata.length === 1){
        //update it
        let updateWhoweare = await Whoweare.findOne({
            where:{
                id: whowearedata[0].id
            },
        })
        if(mainImage && subImage) {
            await updateWhoweare.update({
                mainImage: mainImage[0].filename,
                subImage: subImage[0].filename,
            })
            deletiongProcess(whowearedata[0].mainImage)
            deletiongProcess(whowearedata[0].subImage)
        }
        else if(mainImage){
            await updateWhoweare.update({
                mainImage: mainImage[0].filename,
            })
            deletiongProcess(whowearedata[0].mainImage)
        }
        else if(subImage){
            await updateWhoweare.update({
                subImage: subImage[0].filename,
            })
            deletiongProcess(whowearedata[0].subImage)
        }
        let newWhoweare = await updateWhoweare.update(dataText)
        res.send(newWhoweare)
    }
    //create it
    else {
        dataText.mainImage = mainImage[0].filename
        dataText.subImage = subImage[0].filename
        const newWhoweare = await Whoweare.create(dataText)
        res.status(200).send(newWhoweare)
    }
})
const show = asyncHandler(async(req, res) => {
    const data = await Whoweare.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
   });
   res.send(data)
})
module.exports = { store, show }