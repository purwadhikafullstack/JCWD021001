import { Model, DataTypes } from 'sequelize';

export default class ProductType extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    ProductType.belongsTo(models.ProductCategory, {
      foreignKey: 'productCategoryId',
    });
  }
}

export const init = (sequelize) => {
  ProductType.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      productCategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'ProductType',
      timestamps: false,
    },
  );
};
