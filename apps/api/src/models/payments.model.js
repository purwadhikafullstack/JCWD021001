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
      paymentCode: DataTypes.STRING,
      grossAmount: DataTypes.DECIMAL,
      paymentDate: DataTypes.DATE,
      paymentMethod: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
      paymentMessage: DataTypes.STRING
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Payments',
    },
  );
};
