import axios from 'axios'
import { API_ROUTE } from '../../../services/route';

export const deleteCart = async (cartProductId, onCartUpdated) => {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          cartProductIds: cartProductId
        }
      };
      const response = await axios.delete(`${API_ROUTE}cart`, config);
  
  
      // Optionally, you can handle the success or show a notification here.
      if (onCartUpdated) {
        onCartUpdated();
      }
    } catch (err) {
      console.error('Error deleting cart:', err);
      // Optionally, you can handle the error or show a notification here.
    }
  };