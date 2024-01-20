'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class StockJournal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StockJournal.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'products',
          },
          key: 'id',
        },
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'warehouses',
          },
          key: 'id',
        },
      },
      sizeId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'sizes',
          },
          key: 'id',
        },
      },
      colourId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'colours',
          },
          key: 'id',
        },
      },
      isAdding: { type: DataTypes.BOOLEAN, allowNull: false },
      qty: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'StockJournal',
      timestamps: true,
    },
  )
  return StockJournal
}
