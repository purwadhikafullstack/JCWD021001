import { Model, DataTypes } from 'sequelize';

export default class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Product.belongsTo(models.ProductType, {
      as: 'type',
      foreignKey: 'productTypeId',
    });
    Product.belongsTo(models.ProductGroup, {
      as: 'group',
      foreignKey: 'productGroupId',
    });
    Product.belongsTo(models.Colour, {
      as: 'colour',
      foreignKey: 'colourId',
    });
    Product.belongsTo(models.ProductCategory, {
      as: 'category',
      foreignKey: 'productCategoryId',
    });
    Product.hasMany(models.ProductImage, {
      as: 'images',
    });
    Product.hasMany(models.Stock, { as: 'stocks' });
  }
}

export const init = (sequelize) => {
  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 0),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      productGroupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      productTypeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      productCategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      colourId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      timestamps: true,
    },
  );
};
