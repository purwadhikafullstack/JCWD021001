import axios from 'axios'

export const deleteCart = async (cartProductId, onCartUpdated) => {
    try {
      const response = await axios.delete('http://localhost:8000/api/cart/', {
        data: { cartProductIds: cartProductId }
      });
  
      console.log('Cart deleting successfully:', response.data.data);
  
      // Optionally, you can handle the success or show a notification here.
      if (onCartUpdated) {
        onCartUpdated();
      }
    } catch (err) {
      console.error('Error deleting cart:', err);
      // Optionally, you can handle the error or show a notification here.
    }
  };