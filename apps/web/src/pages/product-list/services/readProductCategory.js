import axios from 'axios'

export const getProductCategory = async (setProductCategory, gender) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product-category?gender=${gender}`)
    return setProductCategory(res?.data?.data)
  } catch (err) {
    throw err
  }
}
