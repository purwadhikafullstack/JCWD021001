import { Model, DataTypes } from 'sequelize';

export default class City extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    City.belongsTo(models.Province, { foreignKey: 'provinceId' });
    City.hasMany(models.UserAddress, { foreignKey: 'cityId' });
    City.hasMany(models.Warehouse, { foreignKey: 'cityId' });
  }
}

export const init = (sequelize) => {
  City.init(
    {
      name: DataTypes.STRING,
      provinceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'City',
      timestamps: false,
    },
  );
};
