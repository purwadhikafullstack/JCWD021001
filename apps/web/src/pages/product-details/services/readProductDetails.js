import axios from 'axios'

export const getProductDetails = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product/details/${id}`)
    const product = res?.data?.data?.rows[0]
    return product
    // setProduct(res?.data?.data?.rows[0])
  } catch (err) {
    throw err
  }
}
