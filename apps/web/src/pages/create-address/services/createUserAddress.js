import axios from "axios";
import toast from "react-hot-toast";


export const createUserAddress = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode, latitude, longitude) => {
const token = localStorage.getItem("token")
try{ 
    await axios.post(`${import.meta.env.VITE_API_URL}/user-address/create-user-address?id=${id}&latitude=${latitude}&longitude=${longitude}`, {
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
    );
    } catch (err){
        const errorMessage = err?.response?.data || 'An error occurred while deleting the user address.';
        toast.error(errorMessage);
    }
}