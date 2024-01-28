import { Model, DataTypes } from 'sequelize'
import Mutation from './mutation.model'

export default class Warehouse extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    this.belongsTo(models.User, { foreignKey: 'userId' })
    this.belongsTo(models.City, { foreignKey: 'cityId' })
    this.hasMany(models.Orders, { foreignKey: 'warehouseId', as: 'warehouse' })
    Warehouse.hasMany(Mutation, { foreignKey: 'requesterWarehouseId' })
    Warehouse.hasMany(Mutation, { foreignKey: 'recipientWarehouseId' })
  }
}

export const init = (sequelize) => {
  Warehouse.init(
    {
      address: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Warehouse',
      timestamps: false,
    },
  )
}
