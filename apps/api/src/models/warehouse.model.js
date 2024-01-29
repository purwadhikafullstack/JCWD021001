import { Model, DataTypes } from 'sequelize'
import Mutation from './mutation.model'

export default class Warehouse extends Model {
  static associate(models) {
    // define association here
    this.belongsTo(models.User, { foreignKey: 'userId' })
    this.belongsTo(models.WarehouseAddress, { foreignKey: 'warehouseAddressId' })
    this.hasMany(models.Orders, { foreignKey: 'warehouseId', as: 'warehouse' })
    Warehouse.hasMany(Mutation, { foreignKey: 'requesterWarehouseId' })
    Warehouse.hasMany(Mutation, { foreignKey: 'recipientWarehouseId' })
  }
}

export const init = (sequelize) => {
  Warehouse.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      warehouseAddressId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Warehouse',
      timestamps: false,
    },
  )
}
