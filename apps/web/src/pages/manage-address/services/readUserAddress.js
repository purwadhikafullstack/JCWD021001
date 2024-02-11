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
      const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
    }
}