import axios from 'axios'

export const createProduct = async (name, price, description, productCategoryId) => {
  try {
    const res = await axios.post(`http://localhost:8000/api/product/create`, {
      name,
      price,
      description,
      productCategoryId,
    })
    return res
  } catch (err) {
    throw err
  }
}
