import axios from 'axios'

export const updateOrder = async (updateOrder) => {
  try {
    // console.log('aaa', updateOrder);
    const response = await axios.patch(`http://localhost:8000/api/order/${updateOrder?.orderId}`, {
      orderStatusId: updateOrder?.orderStatusId,
    })
    return response
  } catch (err) {
    console.error('Error updating cart:', err)
  }
}