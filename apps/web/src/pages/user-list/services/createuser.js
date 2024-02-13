import axios from 'axios'
import toast from 'react-hot-toast'

export const createUser = async (email, username, roleId, setLoading) => {
  const token = localStorage.getItem('token')
  try {
    setLoading(true)
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}user/`,
      {
        email,
        username,
        roleId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setLoading(false)
    toast.success('user created successfully')
    return response?.data?.data
  } catch (err) {
    setLoading(false)
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
  }
}
