import axios from "axios";
import { API_ROUTE } from "../../../services/route";

export const getCheckStock = async (orderId) => {
    try {
        const response = await axios.get(`${API_ROUTE}/order/stock/${orderId}`);
        return response.data.data.checkStockResults
    } catch (err){
        throw err
    }
}