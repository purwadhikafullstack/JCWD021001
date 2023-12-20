import { Model, DataTypes } from 'sequelize';

export default class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    this.belongsTo(models.Role, { foreignKey: 'roleId' });
    this.hasMany(models.Warehouse, { foreignKey: 'userId' });
    this.hasMany(models.UserAddress, {foreignkey: 'userId'});
    this.hasMany(models.Carts, {foreignKey: 'userId'});
    this.hasMany(models.Orders, {foreignKey: 'userId'})
  }
}

// one-to-many => hasMany belongsTo

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
      timestamps: false,
    },
  );
};
