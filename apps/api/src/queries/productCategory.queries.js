import ProductCategory from '../models/productCategory.model';
import ProductType from '../models/productType.model';

export const getProductCategoryQuery = async () => {
  try {
    const res = await ProductCategory.findAll({
      include: [
        {
          model: ProductType,
          as: 'type',
        },
      ],
    });
    return res;
  } catch (err) {
    throw err;
  }
};
