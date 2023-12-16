'use strict';
import { DataTypes, Model } from 'sequelize';
export default class StockReport extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    StockReport.hasOne(models.Product);
    StockReport.hasMany(models.Warehouse);
    StockReport.hasOne(models.Mutation);
  }
}
export const init = (sequelize) => {
  StockReport.init(
    {
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      warehouseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtyBefore: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtyAfter: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      mutationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'StockReport',
    },
  );
};
