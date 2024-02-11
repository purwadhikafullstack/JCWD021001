import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token")

export const editWarehouse = async (id, location, cityId, postalCode, latitude, longitude, name) => {    
    try{
        await axios.patch(`${import.meta.env.VITE_API_URL}warehouse/${id}`, {
            location, cityId, postalCode, latitude, longitude, name
        },
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
          )
          toast.success('warehouse updated successfully')
    } catch (err){
        const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
    }
}

export const assignAdminWarehouse = async (adminIds, warehouseId) => {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}warehouse/assign/${warehouseId}`, 
            { adminIds }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        toast.success('admins assigned successfully')
    } catch (err) {
        const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
    }
};