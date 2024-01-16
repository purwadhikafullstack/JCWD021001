import axios from 'axios'

export const getProductType = async (name = null, setProductType) => {
  try {
    // const res = await axios.get(`http://localhost:8000/api/product-type-to-group?typeName=${name}`)
    setProductType(res?.data?.data)
  } catch (err) {
    throw err
  }
}
