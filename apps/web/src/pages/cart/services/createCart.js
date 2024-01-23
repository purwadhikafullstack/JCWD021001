import axios from 'axios'
import toast from 'react-hot-toast'

export const createCart = async () => {
  try {
    const response = await axios.post(' http://localhost:8000/api/cart', {
      userId: 2,
      stockId: 1,
      price: 50000,
      quantity: 1,
    })
    // alert("Order created")
    return response.data.data.order.id
  } catch (err) {
    alert('Error occurred')
  }
}
