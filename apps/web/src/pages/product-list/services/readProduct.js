import axios from 'axios'

export const getProduct = async (name, gender, group, category, setProducts, sortBy, orderBy) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/api/product?name=${name}&gender=${gender}&group=${group}&category=${category}&sortBy=price&orderBy=ASC`,
    )
    return setProducts(res?.data?.data)
  } catch (err) {
    throw err
  }
}
