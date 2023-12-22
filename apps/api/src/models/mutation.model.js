'use strict';
import { DataTypes, Model } from 'sequelize';
export default class Mutation extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
export const init = (sequelize) => {
  Mutation.init(
    {
      senderWarehouseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      receiverWarehouseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          checkQty(value) {
            if (value <= 0) throw new Error('Quantity cannot be 0');
          },
        },
      },
      statusId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    },
    {
      sequelize,
      modelName: 'Mutation',
    },
  );
};
