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
    StockReport.belongsTo(models.Product);
    StockReport.belongsTo(models.Warehouse);
    StockReport.belongsTo(models.Mutation);
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
