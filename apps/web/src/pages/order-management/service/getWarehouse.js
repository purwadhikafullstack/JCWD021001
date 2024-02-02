import axios from "axios";

export const getWarehouse = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/order/warehouse`);
        // alert("payment created")
        return response.data.data
    } catch (err){
        alert("Error occurred")
    }
}