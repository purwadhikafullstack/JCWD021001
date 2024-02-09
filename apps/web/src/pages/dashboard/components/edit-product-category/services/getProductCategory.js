import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const getProductCategory = async (setProductCategory, gender) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.get(`${API_ROUTE}/product-category?gender=${gender}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setProductCategory(res?.data?.data)
  } catch (err) {
    throw err
  }
}

export const getGender = async (name, setGender) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.get(`${API_ROUTE}/product-category/gender?name=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setGender(res?.data?.data)
  } catch (err) {
    throw err
  }
}
