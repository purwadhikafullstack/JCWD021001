import { Model, DataTypes } from 'sequelize';

export default class CartProducts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // this.belongsTo(models.Stock, { as: 'stocks', foreignKey: 'stockId', });
    this.belongsTo(models.Carts, { foreignKey: 'cartId' });
    this.belongsTo(models.Product, { as: 'product', foreignKey: 'productId' })
    this.belongsTo(models.Colour, { as: 'colour', foreignKey: 'colourId' })
    this.belongsTo(models.Size, { as: 'size', foreignKey: 'sizeId' })
  }
}

export const init = (sequelize) => {
  CartProducts.init(
    {
      productId: DataTypes.INTEGER,
      cartId: DataTypes.INTEGER,
      colourId: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
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
