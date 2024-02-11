import axios from 'axios'

export const getProductCategories = async (setProductCategory, gender) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.get(`http://localhost:8000/api/product-category?gender=${gender}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return setProductCategory(res?.data?.data)
  } catch (err) {
    throw err
  }
}
