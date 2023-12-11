import { Model, DataTypes } from 'sequelize';

export default class PaymentProofs extends Model {
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
  PaymentProofs.init(
    {
      userId: DataTypes.INTEGER,
      paymentId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      uploadDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'PaymentProofs',
    },
  );
};
