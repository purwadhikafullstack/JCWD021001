import { DataTypes, Model } from 'sequelize'

export default class Stock extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Stock.belongsTo(models.Product, { as: 'stocks', foreignKey: 'productId' })
    Stock.belongsTo(models.Warehouse, {
      as: 'warehouse',
      // foreignKey: 'warehouseId',
    })
    Stock.belongsTo(models.Size, { as: 'size', foreignKey: 'sizeId' })
    Stock.belongsTo(models.Colour, { as: 'colour', foreignKey: 'colourId' })
    // Stock.hasMany(models.CartProducts)
    // Stock.hasMany(models.OrderProducts)
  }
}
export const init = (sequelize) => {
  Stock.init(
    {
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'products',
          },
          key: 'id',
        },
      },
      warehouseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'warehouses',
          },
          key: 'id',
        },
      },
      sizeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'sizes',
          },
          key: 'id',
        },
      },
      colourId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'colours',
          },
          key: 'id',
        },
      },
      qty: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Stock',
      timestamps: true,
    },
  )
}
