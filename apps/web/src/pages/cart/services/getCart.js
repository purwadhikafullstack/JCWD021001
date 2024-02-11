import axios from "axios";
import { API_ROUTE } from "../../../services/route";

export const getCart = async (stockData) => {
    try {
        const response = await axios.get(`${API_ROUTE}/cart/1`,{
            params: {
                stockIds: stockData
            }
        });
        return response.data.data
    } catch (err){
        alert("Error occurred")
    }
}