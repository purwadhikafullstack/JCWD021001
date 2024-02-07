import axios from "axios";

export const deleteWarehouseFunction = async (id) => {
    const token = localStorage.getItem("token")
    try {
        await axios.delete(`http://localhost:8000/api/warehouse/${id}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        
    } catch (err){
        console.log(err);
    }
}