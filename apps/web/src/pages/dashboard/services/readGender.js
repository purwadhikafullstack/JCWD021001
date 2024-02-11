import axios from 'axios'
export const getGender = async (setGender) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.get(`http://localhost:8000/api/product-category/gender`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setGender(res?.data?.data)
  } catch (err) {
    throw err
  }
}
