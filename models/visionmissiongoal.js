'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VisionMissionGoal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VisionMissionGoal.init({
    VisionTitle: DataTypes.STRING,
    VisionDescription: DataTypes.TEXT('long'),
    MissionTitle: DataTypes.STRING,
    MissionDescription: DataTypes.TEXT('long'),
    GoalTitle: DataTypes.STRING,
    GoalDescription: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'VisionMissionGoal',
  });
  return VisionMissionGoal;
};