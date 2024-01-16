import axios from 'axios'

export const getProduct = async (
  name,
  productGroup,
  productType,
  productCategory,
  setProducts,
  sortBy,
  orderBy,
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/product?name=${name}&productGroup=${productGroup}&productType=${productType}&productCategory=${productCategory}&sortBy=${sortBy}&orderBy=${orderBy}`,
    )
    console.log('Product Type From Get Product', productType)
    return setProducts(res?.data?.data)
  } catch (err) {
    throw err
  }
}
