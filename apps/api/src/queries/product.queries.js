import Product from '../models/product.model';
import { Op, where } from 'sequelize';

export const getProductQuery = async (
  name = null,
  productGroup = null,
  productType = null,
  productCategory = null,
  id = null,
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
          all: true,
          nested: true,
        },
      ],
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
