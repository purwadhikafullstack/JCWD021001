import axios from "axios"
import toast from "react-hot-toast"

const token = localStorage.getItem("token")
export const findUserAddress = async (id) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-address/address/${id}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        const address = response.data?.data
        return address
    } catch (err){
        const errorMessage = err?.response?.data || 'An error occurred while deleting the user address.';
        toast.error(errorMessage);
    }
}