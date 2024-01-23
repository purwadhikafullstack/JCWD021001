import axios from 'axios'

export const updateProduct = async (name, price, description, productCategoryId, id) => {
  try {
    const res = await axios.patch(`http://localhost:8000/api/product/${id}`, {
      name,
      price,
      description,
      productCategoryId,
      id,
    })
    return res
  } catch (err) {
    throw err
  }
}
