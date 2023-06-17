const { Place } = require('../../models');
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize');

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
        let PlaceData =  await Place.findAndCountAll(
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
                attributes: { exclude: ['updatedAt'] }
            },
        );
        let totalCount = PlaceData.count
        let totalPages = Math.ceil(PlaceData.count / pageLimitColumn) 
        res.json({ totalPages, currentPage, PlaceData, pageLimit, counterPageLimit, totalCount, pageLimitColumn});
    }
    else{
        res.status(400).send('Not Allowed')
    }
})

module.exports = {index}