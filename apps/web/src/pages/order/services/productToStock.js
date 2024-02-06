import axios from 'axios'

export const productToStock = async (products, nearestWarehouse) => {
  try {
    // console.log('halo', stockData)
    const response = await axios.get(`http://localhost:8000/api/order/stock`, {
      params: {
        products: products,
        nearestWarehouse: nearestWarehouse,
      },
    })
    // alert("payment created")
    console.log('productToStock', response.data.data)
    return response.data.data
  } catch (err) {
    alert('Error occurred')
  }
}
