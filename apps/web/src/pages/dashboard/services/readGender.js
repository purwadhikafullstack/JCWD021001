import axios from 'axios'
export const getGender = async (setGender) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product-category/gender`)
    setGender(res?.data?.data)
  } catch (err) {
    throw err
  }
}
