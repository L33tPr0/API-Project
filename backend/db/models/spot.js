'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId"
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId"
      });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      },
      onDelete:'CASCADE'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: /[ a-zA-Z0-9]+/,
        shorten(val){
          return val.trim();
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[ a-zA-Z]+/,
        shorten(val){
          return val.trim();
        },
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[ a-zA-Z]+/,
        shorten(val){
          return val.trim();
        },
        notEmpty: true
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[ a-zA-Z]+/,
        shorten(val){
          return val.trim();
        },
        notEmpty: true
      }
    },
    lat: {
      type: DataTypes.DECIMAL(9,7),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /[ a-zA-Z]+/,
        shorten(val){
          return val.trim();
        },
        notEmpty: true,
        len: [2,49]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.DECIMAL(7,2),
      allowNull: false,
      validate: {
        min: .01,
        isDecimal: true
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};