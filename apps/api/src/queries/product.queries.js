import ProductGroup from '../models/productGroup.model';
import Product from '../models/product.model';

export const getProductQuery = async () => {
  try {
    const res = await Product.findAll({});
    return res;
  } catch (err) {
    throw err;
  }
};
