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
      const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
    }
}