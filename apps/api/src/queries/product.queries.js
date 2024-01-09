import Product from '../models/product.model';
import ProductGroup from '../models/productGroup.model';
import ProductCategory from '../models/productCategory.model';
import ProductType from '../models/productType.model';
import Warehouse from '../models/warehouse.model';
import { Op } from 'sequelize';
import Stock from '../models/stock.model';
import Size from '../models/size.model';

export const getProductQuery = async (
  name = null,
  productGroup = null,
  productType = null,
  productCategory = null,
  id = null,
  sortBy = 'name',
  orderBy = 'ASC',
) => {
  try {
    const filter = {};
    if (id)
      filter.where = {
        id: {
          [Op.eq]: id,
        },
      };
    if (name)
      filter.where = {
        name: {
          [Op.eq]: name,
        },
      };
    if (productGroup)
      filter.where = {
        [Op.and]: [
          {
            productGroupId: productGroup,
          },
          {
            [Op.or]: [
              {
                productCategoryId: productCategory,
              },
              {
                productTypeId: productType,
              },
            ],
          },
        ],
      };
    const res = await Product.findAll({
      include: [
        {
          model: ProductGroup,
          as: 'group',
        },
        {
          model: ProductCategory,
          as: 'category',
        },
        {
          model: ProductType,
          as: 'type',
          include: [
            {
              model: ProductCategory,
              as: 'category',
            },
          ],
        },
        {
          model: Stock,
          as: 'stocks',
          include: { model: Warehouse, as: 'warehouse' },
          include: { model: Size, as: 'size' },
        },
      ],
      order: [[`${sortBy}`, `${orderBy}`]],
      ...filter,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const createProductQuery = async (
  name = null,
  price = null,
  description = null,
  productGroupId = null,
  productTypeId = null,
  productCategoryId = null,
  colourId = null,
) => {
  try {
    const res = await Product.create({
      name,
      price,
      description,
      productGroupId,
      productTypeId,
      productCategoryId,
      colourId,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateProductQuery = async (
  name,
  price,
  description,
  productGroupId,
  productTypeId,
  productCategoryId,
  colourId,
  id,
) => {
  try {
    const toBeUpdated = {};
    if (name) toBeUpdated.name = name;
    if (price) toBeUpdated.price = price;
    if (description) toBeUpdated.description = description;
    if (productGroupId) toBeUpdated.productGroupId = productGroupId;
    if (productTypeId) toBeUpdated.productTypeId = productTypeId;
    if (productCategoryId) toBeUpdated.productCategoryId = productCategoryId;
    if (colourId) toBeUpdated.colourId = colourId;

    const res = await Product.update(
      {
        ...toBeUpdated,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      },
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteProductQuery = async (id) => {
  try {
    const res = await Product.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
