"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Geolocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "id" });
    }
  }
  Geolocation.init(
    {
      online: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      socketID: {
        type: DataTypes.STRING,
        unique: true,
      },
      location: {
        type: DataTypes.GEOMETRY,
      },
      online: {
        type: DataTypes.BOOLEAN,
      },
      trackerID: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Geolocation",
    }
  );
  return Geolocation;
};
