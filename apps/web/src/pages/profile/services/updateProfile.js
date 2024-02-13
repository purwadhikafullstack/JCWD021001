import axios from 'axios'
import toast from 'react-hot-toast'

const token = localStorage.getItem('token')
export const updateUsername = async (userId, username) => {
  try {
    const { data } = await axios.patch(
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
    toast.success("Username updated successfully")
    return data?.data
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
  }
}

export const updateEmail = async (userId, email) => {
  try {
    const data = await axios.patch(
      `${import.meta.env.VITE_API_URL}user/update-email/${userId}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return data?.data
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
  }
}

export const editPassword = async (userId, password) => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}user/update-password/${userId}`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    toast.success("Password updated successfully")
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
  }
}
