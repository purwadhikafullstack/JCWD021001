import { Model, DataTypes } from 'sequelize';

export default class CartProducts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'productId' });
    this.belongsTo(models.Carts, { foreignKey: 'cartId' });
  }
}

export const init = (sequelize) => {
  CartProducts.init(
    {
      productId: DataTypes.INTEGER,
      cartId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'CartProducts',
    },
  );
};
