import { Model, DataTypes } from 'sequelize';

export default class Orders extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

export const init = (sequelize) => {
  Orders.init(
    {
      userId: DataTypes.INTEGER,
      warehouseId: DataTypes.INTEGER,
      totalAmount: DataTypes.DECIMAL,
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
