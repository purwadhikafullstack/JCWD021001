import { Model, DataTypes } from 'sequelize';

export default class Role extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Role.hasMany(models.User, { foreignKey: 'roleId' });
  }
}

export const init = (sequelize) => {
  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
      timestamps: false,
    },
  );
};
