import Product from '../models/product.model';
import { Op } from 'sequelize';
export const getProductQuery = async (
  productGroup = null,
  productType = null,
  productCategory = null,
) => {
  try {
    const filter = {};
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
    console.log('FILTER', filter);
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
