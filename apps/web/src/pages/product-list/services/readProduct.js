import axios from 'axios'

export const getProduct = async (
  name = '',
  gender = '',
  group = '',
  category = '',
  setProducts,
  sortBy = 'name',
  orderBy = 'ASC',
) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/product?name=${name}&gender=${gender}&group=${group}&category=${category}&sortBy=${sortBy}&orderBy=${orderBy}`,
    )
    setProducts(res?.data?.data)
  } catch (err) {
    throw err
  }
}
