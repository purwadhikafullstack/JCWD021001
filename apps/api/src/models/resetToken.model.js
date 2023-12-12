import { Model, DataTypes } from 'sequelize';

export default class ResetToken extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    ResetToken.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

export const init = (sequelize) => {
  ResetToken.init(
    {
      token: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      isUsed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'ResetToken',
    },
  );
};
