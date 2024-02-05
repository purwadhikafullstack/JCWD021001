import axios from 'axios'

export const productToStock = async (stockData) => {
  try {
    console.log('halo', stockData);
    const response = await axios.get(`http://localhost:8000/api/order/stock`, {
      params: {
        productId: stockData
      },
    })
    // alert("payment created")
    console.log('productToStock', response.data.data);
    return response.data.data
  } catch (err) {
    alert('Error occurred')
  }
}