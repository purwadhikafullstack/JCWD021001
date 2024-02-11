import axios from 'axios'
import toast from 'react-hot-toast'

export const getUserList = async (
  cityId = '',
  isVerified = '',
  username = '',
  page = 1,
  pageSize = 10,
  sortField = 'username',
  sortOrder = 'ASC',
) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}user/user-list?cityId=${cityId}&isVerified=${isVerified}&username=${username}&page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response?.data?.data
  } catch (err) {
    const errorMessage = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : "An unexpected error occurred"; 
    toast.error(errorMessage);
  }
}

export const getCity = async (name) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/user-address?name=${name}`)
    console.log('ini city', response)
    return response?.data?.data
  } catch (err) {
    const errorMessage = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : "An unexpected error occurred"; 
    toast.error(errorMessage);
  }
}
