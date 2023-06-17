'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const Dish = sequelize.define('Dish', {
          Title: DataTypes.STRING,
          Description: DataTypes.TEXT,
      });
      Category.hasMany(Dish,  {as: 'Dish', foreignKey: 'category_id'})
    }
  }
  Category.init({
    Title: DataTypes.STRING,
    Description: DataTypes.TEXT('long'),
    mainImage: DataTypes.STRING,
    subMainImage: DataTypes.STRING,
    subImage1: DataTypes.STRING,
    subImage2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};