import { Model, DataTypes } from 'sequelize';

export default class OrderProducts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    this.belongsTo(models.Orders, { foreignKey: 'orderId' });
    this.belongsTo(models.Stock, { foreignKey: 'stockId' });
  }
}

export const init = (sequelize) => {
  OrderProducts.init(
    {
      orderId: DataTypes.INTEGER,
      stockId: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'OrderProducts',
    },
  );
};
