import { Model, DataTypes } from 'sequelize'
import OrderStatuses from './orderStatuses.model'

export default class Orders extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    this.belongsTo(models.User, { foreignKey: 'userId' })
    this.belongsTo(models.UserAddress, { foreignKey: 'userAddressId' })
    this.belongsTo(models.Warehouse, { foreignKey: 'warehouseId', as: 'warehouse' })
    this.belongsTo(models.OrderStatuses, { foreignKey: 'orderStatusId' })
    this.hasMany(models.OrderProducts, { foreignKey: 'orderId' })
    this.hasOne(models.Payments, { foreignKey: 'orderId' })
    this.belongsTo(OrderStatuses, { foreignKey: 'orderStatusId', as: 'status' })
  }
}

export const init = (sequelize) => {
  Orders.init(
    {
      userId: DataTypes.INTEGER,
      userAddressId: DataTypes.INTEGER,
      warehouseId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      totalQuantity: DataTypes.INTEGER,
      shippingCost: DataTypes.DECIMAL,
      orderDate: DataTypes.DATE,
      updateDate: DataTypes.DATE,
      orderNumber: DataTypes.STRING,
      orderStatusId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'orderStatuses',
          },
          key: 'id',
        },
      },
      expectedDeliveryDate: DataTypes.DATE,
    },
    {
      sequelize,
      createdAt: 'orderDate',
      updatedAt: 'updateDate',
      modelName: 'Orders',
      timezone: '+07:00'
    },
  )
}
