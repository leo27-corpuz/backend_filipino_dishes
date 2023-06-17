'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const Category = sequelize.define('Category', {
          Title: DataTypes.STRING,
          Description: DataTypes.TEXT,
      });
      const Place = sequelize.define('Place', {
          Title: DataTypes.STRING,
          Description: DataTypes.TEXT,
      });
      // define association here
      Dish.belongsTo(Category, {as: 'Category', foreignKey: 'category_id' });
      Dish.belongsTo(Place, {as: 'Place', foreignKey: 'place_id' });
    }
  }
  Dish.init({
    Title: DataTypes.STRING,
    Description: DataTypes.TEXT('long'),
    category_id: DataTypes.INTEGER,
    place_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Dish',
  });
  return Dish;
};