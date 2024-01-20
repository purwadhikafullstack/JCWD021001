'use strict'
const { DataTypes, Model } = require('sequelize')

export default class StockJournal extends Model {
  static associate(models) {}
}

export const init = (sequelize) => {
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
}
