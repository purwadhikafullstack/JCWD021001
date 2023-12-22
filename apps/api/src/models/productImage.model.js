import { Model, DataTypes } from 'sequelize';

export default class ProductImage extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    ProductImage.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId',
    });
  }
}

export const init = (sequelize) => {
  ProductImage.init(
    {
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'ProductImage',
      timestamps: false,
    },
  );
};
