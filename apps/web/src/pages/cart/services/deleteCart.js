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
      const res = await axios.delete(`${API_ROUTE}cart`, config);
      if (onCartUpdated) {
        onCartUpdated();
      }
      return res?.data?.message
    } catch (err) {
      throw err?.response?.data?.error
    }
  };