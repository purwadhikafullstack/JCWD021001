import Product from '../models/product.model';
import ProductCategory from '../models/productCategory.model';
import ProductType from '../models/productType.model';

export const getProductQuery = async () => {
  try {
    const res = await Product.findAll({
      include: [
        {
          all: true,
          nested: true,
        },
      ],
    });
    return res;
  } catch (err) {
    throw err;
  }
};
