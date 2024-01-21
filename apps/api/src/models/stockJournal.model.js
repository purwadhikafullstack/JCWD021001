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
      qtyBefore: { type: DataTypes.INTEGER, allowNull: false },
      qtyAfter: { type: DataTypes.INTEGER, allowNull: false },
      stockId: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize,
      modelName: 'StockJournal',
      timestamps: true,
    },
  )
}
