import { Model, DataTypes } from 'sequelize'

export default class WarehouseAddress extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.hasOne(models.Warehouse, { foreignKey: 'warehouseAddressId', as: 'warehouse' })
    this.belongsTo(models.City, { foreignKey: 'cityId' })
  }
}

export const init = (sequelize) => {
  WarehouseAddress.init(
    {
      location: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      postalCode: DataTypes.INTEGER,
      latitude: DataTypes.DECIMAL(10, 8),
      longitude: DataTypes.DECIMAL(11, 8),
    },
    {
      sequelize,
      modelName: 'WarehouseAddress',
      timestamps: false,
    },
  )
}
