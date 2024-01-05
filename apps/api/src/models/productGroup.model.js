import { Model, DataTypes } from 'sequelize';

export default class ProductGroup extends Model {
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
  ProductGroup.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'ProductGroup',
      timestamps: false,
    },
  );
};
