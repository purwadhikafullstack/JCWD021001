import axios from 'axios'

export const createProduct = async (name, price, categoryId, description) => {
  try {
    const res = await axios.post(`http://localhost:8000/api/product`)
  } catch (err) {
    throw err
  }
}
