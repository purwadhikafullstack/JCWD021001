import axios from "axios";
import { API_ROUTE } from "../../../services/route";

export const getCart = async (stockData) => {
    try {
        // console.log('data', stockData);
        const response = await axios.get(`${API_ROUTE}/cart/1`,{
            params: {
                stockIds: stockData
            }
        });
        // alert("payment created")
        return response.data.data
    } catch (err){
        // console.log(err);
        alert("Error occurred")
    }
}