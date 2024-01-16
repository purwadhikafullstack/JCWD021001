import { Model, DataTypes } from 'sequelize'

export default class ProductCategory extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    // ProductCategory.hasMany(ProductType, {
    //   as: 'type',
    // })
    ProductCategory.belongsTo(ProductCategory, { as: 'parent' })
  }
}

export const init = (sequelize) => {
  ProductCategory.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlpha: true,
        },
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
    },
  )
}
