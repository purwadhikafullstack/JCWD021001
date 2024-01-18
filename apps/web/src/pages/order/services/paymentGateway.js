import axios from 'axios'
import toast from 'react-hot-toast'

export const paymentGateway = async (dataPayment) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/payment`, {
      userId: dataPayment.userId,
      orderId: dataPayment.orderId,
      totalPrice: dataPayment.totalPrice,
      shippingCost: dataPayment.shippingCost,
      products: dataPayment.products,
    })
    console.log('midtransToken', response.data.data)
    // alert("payment created")
    return response.data.data
  } catch (err) {
    alert('Error occurred')
  }
}
