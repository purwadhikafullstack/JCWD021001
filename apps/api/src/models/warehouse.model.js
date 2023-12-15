import { Model, DataTypes } from 'sequelize';

export default class Warehouse extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.hasMany(models.City, { foreignKey: 'cityId' });
  }
}

export const init = (sequelize) => {
  Warehouse.init(
    {
      address: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Warehouse',
      timestamps: false,
    },
  );
};
