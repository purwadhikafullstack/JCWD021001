import { Model, DataTypes } from 'sequelize'
import Size from './size.model'
import Product from './product.model'

export default class ProductCategory extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    ProductCategory.belongsTo(ProductCategory, { as: 'parent' })
    ProductCategory.hasMany(Product, { as: 'product' })
    ProductCategory.hasMany(Size, { as: 'size' })
  }
}

export const init = (sequelize) => {
  ProductCategory.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      parentId: {
        allowNull: true,
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
      modelName: 'ProductCategory',
      timestamps: false,
      paranoid: false,
    },
  )
}
