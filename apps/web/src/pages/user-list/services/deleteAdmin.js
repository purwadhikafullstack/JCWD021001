import axios from "axios";
import toast from "react-hot-toast";

export const deleteAdminFunction = async (id) => {
    const token = localStorage.getItem("token")
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}user/${id}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          toast.success('user deleted successfully')
    } catch (err){
      const errorMessage = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : "An unexpected error occurred"; 
    toast.error(errorMessage);
    }
}