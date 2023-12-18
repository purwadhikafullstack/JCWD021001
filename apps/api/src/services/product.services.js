import { getProductQuery } from '../queries/product.queries';

export const getProductService = async () => {
  try {
    const res = await getProductQuery();
    return res;
  } catch (err) {
    throw err;
  }
};
