const { Dish } = require('../../models');
const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize');

const index = asyncHandler(async(req, res) => {
    let DishData =  await Dish.findAndCountAll({ include: ['Category', 'Place'] })
    return res.status(200).send(DishData)
})
module.exports = {index}