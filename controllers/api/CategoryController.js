const { Category } = require('../../models');
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize');
const { validateInputProcess } = require('../../middlewares/validationInput/validateInputs')
const { deletingImages, deletiongProcess } = require('../../middlewares/deletingContent/deletingImages')
const index = asyncHandler(async(req, res) => {
    let pageLimitColumn = parseInt(req.query.limit) || 5
    let currentPage = parseInt(req.query.page) || 1
    let queryId = req.query.id;
    let queryTitle = req.query.title;
    if(currentPage >= 1){
        let searchQuery = ''
        if(req.query.search){
            searchQuery = req.query.search
        }
        let pageLimit = currentPage + 2;
        let counterPageLimit = currentPage - 3;
        let orderBy = [];
        if(queryId) orderBy.push('id', queryId)
        else if(queryTitle) orderBy.push('Title', queryTitle)
        else orderBy.push('id', 'desc')
        let categoryData =  await Category.findAndCountAll(
            { 
                limit: pageLimitColumn,
                offset: (currentPage - 1) * pageLimitColumn,
                order: [
                    orderBy
                ],
                where: {
                    [Op.or]: [
                        { id: { [Op.like]: `%${searchQuery}%` } },
                        { title: { [Op.like]: `%${searchQuery}%` } },
                        { description: { [Op.like]: `%${searchQuery}%` } },
                    ]
                },
                attributes: { exclude: ['mainImage', 'subMainImage', 'subImage1', 'subImage2', 'updatedAt'] }
            },
        );
        let totalCount = categoryData.count
        let totalPages = Math.ceil(categoryData.count / pageLimitColumn) 
        res.json({ totalPages, currentPage, categoryData, pageLimit, counterPageLimit, totalCount, pageLimitColumn});
    }
    else{
        res.status(400).send('Not Allowed')
    }
})
const store = asyncHandler(async(req, res) => {
    const dataText = {
        Title: req.body.Title,
        Description: req.body.Description,
    }
    const filenames = Object.values(req.files).flat().map((file) => file.filename);
    const mainImage = req.files.mainImage;
    const subMainImage = req.files.subMainImage;
    const subImage1 = req.files.subImage1;
    const subImage2 = req.files.subImage2;
    if (!validateInputProcess(dataText)) {
        deletingImages(filenames)
        res.status(400).send('Please select all fields')
    }
    else if(!mainImage || !subMainImage || !subImage1 || !subImage2){
        deletingImages(filenames)
        res.status(400).send('Please select all fields')
    }
    else{
        dataText.mainImage = mainImage[0].filename
        dataText.subMainImage = subMainImage[0].filename
        dataText.subImage1 = subImage1[0].filename
        dataText.subImage2 = subImage2[0].filename
        const newCategory = await Category.create(dataText)
        res.status(200).send(newCategory)
    }
})
const destroy = asyncHandler(async(req, res) => {
    const { id } = req.params
    if(!id){
        res.status(404).send('not found')
    }else{
        let searchCategory = await Category.findByPk(id)
        if(searchCategory === null) return res.status(404).send('not found')

        const filenames = [searchCategory.mainImage, searchCategory.subMainImage, searchCategory.subImage1, searchCategory.subImage2]
        deletingImages(filenames)
        deletiongProcess(searchCategory.Profile)
        await searchCategory.destroy()
        res.status(200).send('success')
    }
})
module.exports = { index, store, destroy }