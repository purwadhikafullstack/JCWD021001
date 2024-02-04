'use strict'
import { DataTypes, Model, Sequelize } from 'sequelize'
import Product from './product.model'
import Colour from './colour.model'
export default class ProductToColour extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // ProductToColour.belongsTo(Product, { foreignKey: 'productId' })
    // ProductToColour.belongsTo(Colour, { foreignKey: 'colourId' })
  }
}

export const init = (sequelize) => {
  ProductToColour.init(
    {},
    {
      sequelize,
      tableName: 'productsToColours',
      modelName: 'ProductToColour',
      timestamps: false,
    },
  )
}
