'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tokens.init(
    {
      connectedAddress: { type: DataTypes.STRING, allowNull: false },
      tokenAddress: { type: DataTypes.STRING, allowNull: false },
      amount: { type: DataTypes.DECIMAL, allowNull: false },
      networkname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'tokens',
      timestamps: false,
    },
  );
  return tokens;
};
