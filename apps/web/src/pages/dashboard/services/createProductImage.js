import axios from 'axios'

export const createProductImage = async (imageUrl, productId) => {
  try {
    const formData = new FormData()
    formData.append('imageUrl', imageUrl)
    formData.append('productId', productId)
    const res = await axios.post(`http://localhost:8000/api/product-image`, formData)
    return res
  } catch (err) {
    throw err
  }
}
