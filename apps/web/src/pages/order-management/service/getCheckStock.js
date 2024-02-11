import axios from "axios";
import { API_ROUTE } from "../../../services/route";

export const getCheckStock = async (orderId) => {
    try {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${API_ROUTE}order/stock/${orderId}`, config);
        return response.data.data.checkStockResults
    } catch (err){
        throw err
    }
}