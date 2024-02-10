import axios from "axios"
import toast from "react-hot-toast"

const token = localStorage.getItem("token")
export const deleteUserAddress = async (id) => {
    try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/user-address/delete-user-address/${id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
    } catch (err){
        const errorMessage = err?.response?.data || 'An error occurred while deleting the user address.';
        toast.error(errorMessage);
    }
}