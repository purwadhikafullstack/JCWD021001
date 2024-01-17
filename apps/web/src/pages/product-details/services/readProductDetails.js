import axios from 'axios'

export const getProductDetails = async (id, setProduct) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product/details/${id}`)
    return setProduct(res?.data?.data[0])
  } catch (err) {
    throw err
  }
}
