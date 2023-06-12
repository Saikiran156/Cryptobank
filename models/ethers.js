'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ethers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ethers.init(
    {
      connectedAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      amount: { type: DataTypes.DECIMAL, allowNull: false },
      networkname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ethers',
      timestamps: false,
    },
  );
  return ethers;
};
