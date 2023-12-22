import { Model, DataTypes } from 'sequelize';

export default class Carts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.hasMany(models.CartProducts, { foreignKey: 'cartId' });
  }
}

export const init = (sequelize) => {
  Carts.init(
    {
      userId: DataTypes.INTEGER,
      priceTotal: DataTypes.DECIMAL,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Carts',
    },
  );
};
