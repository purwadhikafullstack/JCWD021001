import axios from "axios";
import toast from "react-hot-toast";

export const getCart = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/cart/1");
        // alert("payment created")
        return response.data.data
    } catch (err){
        alert("Error occurred")
    }
}