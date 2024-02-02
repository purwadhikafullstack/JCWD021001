import axios from 'axios'

export const updateCart = async (cartProductId, quantity, onCartUpdated) => {
  try {
    const response = await axios.patch(`http://localhost:8000/api/cart/${cartProductId}`, {
      quantity: quantity,
    })
    console.log('Cart updated successfully:', response.data.data)
    if (onCartUpdated) {
      onCartUpdated()
    }
  } catch (err) {
    console.error('Error updating cart:', err)
  }
}

 
