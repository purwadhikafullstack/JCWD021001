import { Model, DataTypes } from 'sequelize';

export default class Warehouse extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.hasMany(models.Orders, { foreignKey: 'warehouseId' });
    this.belongsTo(models.WarehouseAddress, { foreignKey: 'warehouseAddressId' });
  }
}

export const init = (sequelize) => {
  Warehouse.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      warehouseAddressId: DataTypes.INTEGER, 
    },
    {
      sequelize,
      modelName: 'Warehouse',
      timestamps: false,
    },
  );
};