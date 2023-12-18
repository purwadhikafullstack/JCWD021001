import ProductGroup from '../models/productGroup.model';
import Product from '../models/product.model';
import ProductType from '../models/productType.model';
import Colour from '../models/colours.model';

export const getProductQuery = async () => {
  try {
    const res = await Product.findAll({
      include: [
        {
          model: ProductGroup,
        },
        {
          model: ProductType,
        },
        {
          model: Colour,
        },
      ],
    });
    return res;
  } catch (err) {
    throw err;
  }
};
