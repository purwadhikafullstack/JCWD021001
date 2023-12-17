import { Model, DataTypes } from 'sequelize';

export default class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Product.belongsTo(models.ProductGroup);
    Product.belongsTo(models.ProductType);
    Product.belongsTo(models.Colour);
    Product.hasMany(models.CartProducts, { foreignKey: 'productId' });
  }
}

export const init = (sequelize) => {
  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 0),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      productGroupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      productTypeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      colourId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
};
