import { Model, DataTypes } from 'sequelize'
import Mutation from './mutation.model'
import Stock from './stock.model'

export default class Warehouse extends Model {
  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'warehouseId' })
    this.belongsTo(models.WarehouseAddress, { foreignKey: 'warehouseAddressId' })
    this.hasMany(models.Orders, { foreignKey: 'warehouseId', as: 'warehouse' })
    Warehouse.hasMany(Stock, { as: 'stock' })
    Warehouse.hasMany(Mutation, { as: 'requester', foreignKey: 'requesterWarehouseId' })
    Warehouse.hasMany(Mutation, { as: 'recipient', foreignKey: 'recipientWarehouseId' })
  }
}

export const init = (sequelize) => {
  Warehouse.init(
    {
      name: DataTypes.STRING,
      warehouseAddressId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Warehouse',
      timestamps: false,
    },
  )
}
