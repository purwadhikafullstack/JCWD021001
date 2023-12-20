import { Model, DataTypes } from 'sequelize';

export default class Orders extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsTo(models.UserAddress, { foreignKey: 'userAddressId' });
    this.belongsTo(models.Warehouse, { foreignKey: 'warehouseId' });
    this.belongsTo(models.OrderStatuses, { foreignKey: 'orderStatusId' });
    this.hasMany(models.OrderProducts, { foreignKey: 'orderId' });
  }
}

export const init = (sequelize) => {
  Orders.init(
    {
      userId: DataTypes.INTEGER,
      userAddressId: DataTypes.INTEGER,
      warehouseId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      totalQuantity: DataTypes.DECIMAL,
      shippingCost: DataTypes.DECIMAL,
      orderDate: DataTypes.DATE,
      orderStatusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      createdAt: 'orderDate',
      updatedAt: false,
      modelName: 'Orders',
    },
  );
};
