import axios from "axios";
import { API_ROUTE } from "../../../services/route";

export const getWarehouse = async () => {
    try {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${API_ROUTE}order/warehouse`, config);
        return response.data.data
    } catch (err){
        alert("Error occurred")
    }
}