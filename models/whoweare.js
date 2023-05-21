'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Whoweare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Whoweare.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    mainImage: DataTypes.STRING,
    subImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Whoweare',
  });
  return Whoweare;
};