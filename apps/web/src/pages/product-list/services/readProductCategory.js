import axios from 'axios'

export const getProductCategory = async (setProductCategory) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product-category`)
    setProductCategory(res?.data?.data)
  } catch (err) {
    throw err
  }
}
