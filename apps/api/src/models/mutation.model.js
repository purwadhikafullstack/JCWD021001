'use strict'
import { DataTypes, Model } from 'sequelize'
import Warehouse from './warehouse.model'
import Stock from './stock.model'
export default class Mutation extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Mutation.belongsTo(Warehouse, {
      as: 'requester',
      foreignKey: 'requesterWarehouseId',
    })
    Mutation.belongsTo(Warehouse, {
      as: 'recipient',
      foreignKey: 'recipientWarehouseId',
    })
    Mutation.belongsTo(Stock, {
      as: 'stock',
      foreignKey: 'stockId',
    })
  }
}
export const init = (sequelize) => {
  Mutation.init(
    {
      requesterWarehouseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'warehouses',
          },
          key: 'id',
        },
      },
      recipientWarehouseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'warehouses',
          },
          key: 'id',
        },
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          checkQty(value) {
            if (value <= 0) throw new Error('Quantity cannot be 0')
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      stockJournalIdRecipient: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'stockJournals',
          },
          key: 'id',
        },
      },
      isAccepted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      stockJournalIdRequester: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'stockJournals',
          },
          key: 'id',
        },
      },
      stockId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'stocks',
          },
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Mutation',
      timestamps: true,
    },
  )
}
