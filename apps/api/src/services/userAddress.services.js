import {
  findUserAddressQuery,
  createUserAddressQuery,
  findProvinceQuery,
  findCityQuery,
  opencageQuery,
  findCityOpenCageBasedQuery,
  updateUserAddressQuery,
  updateMainAddressQuery,
  removeMainAddressQuery,
  deleteUserAddressQuery,
  findSearchableCityQuery,
  findSearchableProvinceQuery
} from '../queries/userAddress.queries'

export const findUserAddressService = async (id) => {
  try {
    const res = await findUserAddressQuery(id)
    return res
  } catch (err) {
    throw err
  }
}

export const findProvinceService = async () => {
  try {
    const res = await findProvinceQuery()
    return res
  } catch (err) {
    throw err
  }
}

export const findCityService = async (id) => {
  try {
    const res = await findCityQuery(id)
    return res
  } catch (err) {
    throw err
  }
}

export const opencageService = async (latitude, longitude) => {
  try {
    const API_KEY = process.env.OPENCAGE_API_KEY
    const res = await opencageQuery(latitude, longitude, API_KEY)
    return res
  } catch (err) {
    throw err
  }
}

export const findCityOpenCageBasedService = async (city) => {
  try {
    const res = await findCityOpenCageBasedQuery(city)
    return res
  } catch (err) {
    throw err
  }
}

export const findSearchableCityService = async (name) => {
    try {
        const res = await findSearchableCityQuery(name)
        return res
    } catch (err){
        throw err
    }
}

export const findSearchableProvinceService = async (name) => {
    try {
        const res = await findSearchableProvinceQuery(name)
        return res
    } catch (err){
        throw err
    }
}

export const createUserAddressService = async (
  id,
  specificAddress,
  cityId,
  fullName,
  phoneNumber,
  postalCode,
  latitude,
  longitude,
) => {
  try {
    const res = await createUserAddressQuery(
      id,
      specificAddress,
      cityId,
      fullName,
      phoneNumber,
      postalCode,
      latitude,
      longitude,
    )
    return res
  } catch (err) {
    throw err
  }
}

export const updateUserAddressService = async (
  id,
  specificAddress,
  cityId,
  fullName,
  phoneNumber,
  postalCode,
) => {
  try {
    await updateUserAddressQuery(id, specificAddress, cityId, fullName, phoneNumber, postalCode)
  } catch (err) {
    throw err
  }
}

export const updateMainAddressService = async (id, userId) => {
  try {
    await removeMainAddressQuery(userId)
    await updateMainAddressQuery(id)
  } catch (err) {
    throw err
  }
}

export const deleteUserAddressService = async (id) => {
  try {
    await deleteUserAddressQuery(id)
  } catch (err) {
    throw err
  }
}
