import axios from 'axios';

export const getProduct = async (
  name = '',
  productGroup = '',
  productType = '',
  productCategory = '',
  setProduct,
  sortBy,
  orderBy,
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/product?name=${name}&productGroup=${productGroup}&productType=${productType}&productCategory=${productCategory}&sortBy=${sortBy}&orderBy=${orderBy}`,
    );
    setProduct(res?.data?.data);
  } catch (err) {
    throw err;
  }
};
