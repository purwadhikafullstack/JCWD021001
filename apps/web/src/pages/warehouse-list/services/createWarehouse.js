import axios from 'axios'

export const createWarehouse = async (location, cityId, postalCode, latitude, longitude, name) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/warehouse/`,
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

    return response?.data?.data
  } catch (err) {
    console.log(err)
  }
}
