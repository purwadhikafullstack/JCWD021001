import axios from 'axios'

export const createProduct = async (name, price, description, productCategoryId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.post(
      `http://localhost:8000/api/product/create`,
      {
        name,
        price,
        description,
        productCategoryId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return res
  } catch (err) {
    throw err
  }
}
