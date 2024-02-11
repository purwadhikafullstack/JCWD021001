import { Model, DataTypes } from 'sequelize'

export default class Size extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Size.belongsTo(models.ProductCategory, {
      as: 'size',
      foreignKey: 'productCategoryId',
    })
    Size.hasMany(models.CartProducts, { as: 'cartProducts', foreignKey: 'sizeId' })
  }
}

export const init = (sequelize) => {
  Size.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: true,
        },
      },
      productCategoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'productcategories',
          },
        },
        key: 'id',
      },
    },
    {
      sequelize,
      modelName: 'Size',
      timestamps: false,
    },
  )
}
