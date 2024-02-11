import axios from "axios";
import { API_ROUTE } from "../../../services/route";

export const getWarehouse = async () => {
    try {
        const response = await axios.get(`${API_ROUTE}/order/warehouse`);
        return response.data.data
    } catch (err){
        alert("Error occurred")
    }
}