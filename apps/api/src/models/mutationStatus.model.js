'use strict';
import { Model, DataTypes } from 'sequelize';
export default class MutationStatus extends Model {
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
  MutationStatus.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlpha: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'MutationStatus',
    },
  );
};
