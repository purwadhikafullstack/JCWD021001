import axios from "axios";

export const getCheckStock = async (orderId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/order/stock/${orderId}`);
        return response.data.data.checkStockResults

    } catch (err){
        throw err
    }
}