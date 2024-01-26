import { Model, DataTypes } from 'sequelize';

export default class CartProducts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.Stock, { as: 'stocks', foreignKey: 'stockId', });
    this.belongsTo(models.Carts, { foreignKey: 'cartId' });
  }
}

export const init = (sequelize) => {
  CartProducts.init(
    {
      stockId: DataTypes.INTEGER,
      cartId: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'CartProducts',
    },
  );
};
