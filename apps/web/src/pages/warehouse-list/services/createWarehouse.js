import axios from 'axios'

export const createWarehouse = async (location, cityId, postalCode, latitude, longitude, name) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.post(
      'http://localhost:8000/api/warehouse/',
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
