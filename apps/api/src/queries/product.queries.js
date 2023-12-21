import Product from '../models/product.model';
import { Op } from 'sequelize';

export const getProductQuery = async (
  name = null,
  productGroup = null,
  productType = null,
  productCategory = null,
) => {
  try {
    const filter = {};
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
  name,
  price,
  description,
  productGroupId,
  productTypeId,
  productCategoryId,
  colourId,
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
