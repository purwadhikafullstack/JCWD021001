import axios from "axios";
import toast from "react-hot-toast";

export const getCart = async (stockData) => {
    try {
        // console.log('data', stockData);
        const response = await axios.get("http://localhost:8000/api/cart/1",{
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