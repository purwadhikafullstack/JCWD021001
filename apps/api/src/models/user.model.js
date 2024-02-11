import { Model, DataTypes } from 'sequelize';

export default class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'roleId' });
    this.belongsTo(models.Warehouse, { foreignKey: 'warehouseId' });
    this.hasMany(models.UserAddress, {foreignkey: 'userId'});
    this.hasMany(models.Carts, {foreignKey: 'userId'});
    this.hasMany(models.Orders, {foreignKey: 'userId'})
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
      warehouseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    },
  );
};