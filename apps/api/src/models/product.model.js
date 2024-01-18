import { Model, DataTypes } from 'sequelize'
import ProductCategory from './productCategory.model'
import ProductImage from './productImage.model'

export default class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Product.belongsTo(ProductCategory, { foreignKey: 'productCategoryId', as: 'category' })
    Product.hasMany(ProductImage, { as: 'picture' })
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(Date.now()),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(Date.now()),
      },
      productCategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'productCategories',
          },
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
      timestamps: true,
    },
  )
}
