const { Landingpage } = require('../../models');
const {deletiongProcess } = require('../../middlewares/deletingContent/deletingImages')
const asyncHandler = require('express-async-handler')

const store =  asyncHandler(async(req, res) => {
    const dataText = {
        mainTitle: req.body.mainTitle,
        mainDescription: req.body.mainDescription,
        popularDishesTitle: req.body.popularDishesTitle,
        popularDishesDescription: req.body.popularDishesDescription,
    }
    const mainImage = req.files.mainImage;
    const subImage = req.files.subImage;
    const landingPageData = await Landingpage.findAll();
    if (landingPageData.length === 1) {
        //update it
        let updateLanding = await Landingpage.findOne({
            where: {
                id: landingPageData[0].id
            },
        })
        if (mainImage && subImage) {
            await updateLanding.update({
                mainImage: mainImage[0].filename,
                subImage: subImage[0].filename,
            })
            deletiongProcess(landingPageData[0].mainImage)
            deletiongProcess(landingPageData[0].subImage)
        }
        else if (mainImage) {
            await updateLanding.update({
                mainImage: mainImage[0].filename,
            })
            deletiongProcess(landingPageData[0].mainImage)
        }
        else if (subImage) {
            await updateLanding.update({
                subImage: subImage[0].filename,
            })
            deletiongProcess(landingPageData[0].subImage)
        }
        let newLanding = await updateLanding.update(dataText)
        res.status(200).send(newLanding)
    }
    else {
        dataText.mainImage = mainImage[0].filename
        dataText.subImage = subImage[0].filename
        const newLandingPage = await Landingpage.create(dataText)
        res.status(200).send(newLandingPage)
    }
})
const show = asyncHandler(async(req, res) => {
    const data = await Landingpage.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
   });
   res.send(data)
})
module.exports = { store, show}
