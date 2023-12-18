import { Model, DataTypes } from 'sequelize';

export default class Size extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Size.belongsTo(models.ProductCategory, {
      foreignKey: 'productCategoryId',
    });
  }
}

export const init = (sequelize) => {
  Size.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: true,
        },
      },
      productCategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Size',
      timestamps: false,
    },
  );
};
