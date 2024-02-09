import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const getProductCategory = async (setProductCategory, gender) => {
  try {
    const res = await axios.get(`${API_ROUTE}/product-category?gender=${gender}`)
    setProductCategory(res?.data?.data)
  } catch (err) {
    throw err
  }
}

export const getGender = async (name, setGender) => {
  try {
    const res = await axios.get(`${API_ROUTE}/product-category/gender?name=${name}`)
    setGender(res?.data?.data)
  } catch (err) {
    throw err
  }
}
