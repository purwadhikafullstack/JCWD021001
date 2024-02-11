import axios from 'axios'
import toast from 'react-hot-toast'

export const createWarehouse = async (location, cityId, postalCode, latitude, longitude, name) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}warehouse/`,
      {
        location,
        cityId,
        postalCode,
        latitude,
        longitude,
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      toast.success('warehouse created successfully')
    return response?.data?.data
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
  }
}
