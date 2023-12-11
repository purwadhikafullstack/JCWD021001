import { Model, DataTypes } from 'sequelize';

export default class Payments extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

export const init = (sequelize) => {
  Payments.init(
    {
      orderId: DataTypes.INTEGER,
      totalAmount: DataTypes.DECIMAL,
      paymentDate: DataTypes.DATE,
      paymentMethodId: DataTypes.INTEGER,
      paymentStatusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Payments',
    },
  );
};
