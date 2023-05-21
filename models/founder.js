'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Founder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Founder.init({
    Name: DataTypes.STRING,
    Position: DataTypes.STRING,
    Profile: DataTypes.STRING,
    Description: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'Founder',
  });
  return Founder;
};