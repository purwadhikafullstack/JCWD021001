import { getProductQuery } from '../queries/product.queries';

export const getProductService = async (
  productGroup,
  productType,
  productCategory,
) => {
  try {
    const res = await getProductQuery(
      productGroup,
      productType,
      productCategory,
    );
    return res;
  } catch (err) {
    throw err;
  }
};
