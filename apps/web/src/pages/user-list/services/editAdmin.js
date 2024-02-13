import axios from 'axios'
import toast from 'react-hot-toast'

export const editAdmin = async (id, username, email, password, roleId) => {
  const token = localStorage.getItem('token')
  try {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}user/${id}`,
      {
        id,
        username,
        email,
        password,
        roleId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
  }
}
