import { Model, DataTypes } from 'sequelize';

export default class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
    User.hasMany(models.Warehouse, { foreignKey: 'userId' });
    User.hasMany(models.UserAddress, {foreignkey: 'userId'})
  }
}

export const init = (sequelize) => {
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      isVerified: DataTypes.BOOLEAN,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
};
