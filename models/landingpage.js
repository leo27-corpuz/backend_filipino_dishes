'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Landingpage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Landingpage.init({
    mainTitle: DataTypes.STRING,
    mainDescription: DataTypes.TEXT('long'),
    mainImage: DataTypes.STRING,
    subImage: DataTypes.STRING,
    popularDishesTitle: DataTypes.STRING,
    popularDishesDescription: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Landingpage',
  });
  return Landingpage;
};