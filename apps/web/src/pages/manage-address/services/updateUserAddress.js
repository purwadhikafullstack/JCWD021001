import axios from "axios";
import toast from "react-hot-toast";


export const updateUserAddress = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode) => {
    const token = localStorage.getItem("token")
    try{
        await axios.patch(`${import.meta.env.VITE_API_URL}user-address/update-user-address/${id}`, {
            specificAddress, 
            cityId, 
            fullName, 
            phoneNumber, 
            postalCode  
        },
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
    } catch (err){
        const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
    }
}

export const updateMainAddress = async (id, userId) => {
    const token = localStorage.getItem("token")
    try{
        await axios.patch (`${import.meta.env.VITE_API_URL}/user-address/update-main-address?id=${id}&userId=${userId}`, {},
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