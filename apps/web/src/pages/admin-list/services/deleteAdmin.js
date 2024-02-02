import axios from "axios";

export const deleteAdminFunction = async (id) => {
    const token = localStorage.getItem("token")
    try {
        await axios.delete(`http://localhost:8000/api/user/${id}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        
    } catch (err){
        console.log(err);
    }
}