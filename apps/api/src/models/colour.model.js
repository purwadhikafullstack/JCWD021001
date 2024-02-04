import { Model, DataTypes } from 'sequelize'
import Product from './product.model'
import ProductToColour from './productToColour.model'

export default class Colour extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Colour.hasOne(models.Stock)
    Colour.hasMany(models.CartProducts, { as: 'cartProducts', foreignKey: 'colourId' })
  }
}

export const init = (sequelize) => {
  Colour.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Colour',
      timestamps: false,
    },
  )
}
