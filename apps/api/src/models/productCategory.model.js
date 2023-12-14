import { Model, DataTypes } from 'sequelize';

export default class ProductCategory extends Model {
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
  ProductCategory.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlpha: true,
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'ProductCategory',
    },
  );
};
