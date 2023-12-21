import {
  createProductQuery,
  getProductQuery,
} from '../queries/product.queries';

export const getProductService = async (
  name,
  productGroup,
  productType,
  productCategory,
) => {
  try {
    const res = await getProductQuery(
      name,
      productGroup,
      productType,
      productCategory,
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const createProductService = async (
  name,
  price,
  description,
  productGroupId,
  productTypeId,
  productCategoryId,
  colourId,
) => {
  try {
    const check = await getProductQuery(name);

    if (check) throw new Error('Product with that name is already exist');

    const res = await createProductQuery(
      name,
      price,
      description,
      productGroupId,
      productTypeId,
      productCategoryId,
      colourId,
    );
    return res;
  } catch (err) {
    throw err;
  }
};
