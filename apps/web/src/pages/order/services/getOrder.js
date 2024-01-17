import axios from "axios";
import toast from "react-hot-toast";

export const getOrder = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/order/1");
        // alert("payment created")
        return response.data.data
    } catch (err){
        alert("Error occurred")
    }
}