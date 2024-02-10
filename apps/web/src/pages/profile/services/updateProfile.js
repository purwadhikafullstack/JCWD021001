import axios from "axios"
import toast from 'react-hot-toast';


const token = localStorage.getItem('token')
export const updateUsername = async (userId, username) => {
    
    try {
      const {data} = await axios.patch(
        `${import.meta.env.VITE_API_URL}user/update-username/${userId}`,
        {
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return data?.data
    } catch (err) {
        toast.error(err?.response?.data?.message)
    }
  }


  export const updateEmail = async (userId, email) => {
    try {
      const data = await axios.patch(`${import.meta.env.VITE_API_URL}user/update-email/${userId}`, {
        email,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return data?.data
    } catch (err) {
      toast.error(err?.response?.data?.message)
    }
  }

  