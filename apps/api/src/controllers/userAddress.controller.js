import {
  findUserAddressService,
  createUserAddressService,
  findProvinceService,
  findCityService,
  opencageService,
  findCityOpenCageBasedService,
  updateUserAddressService,
  updateMainAddressService,
  deleteUserAddressService,
  findSearchableCityService,
  findSearchableProvinceService,
} from '../services/userAddress.services'

export const findUserAddressController = async (req, res) => {
  try {
    const { id } = req.params
    const result = await findUserAddressService(id)
    return res.status(200).json({
      message: 'success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const findProvinceController = async (req, res) => {
  try {
    const result = await findProvinceService()
    return res.status(200).json({
      message: 'success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const findCityController = async (req, res) => {
  try {
    const { id } = req.params
    const result = await findCityService(id)
    return res.status(200).json({
      message: 'success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const opencageController = async (req, res) => {
  try {
    const { latitude, longitude } = req.query
    const result = await opencageService(latitude, longitude)
    return res.status(200).json({
      message: 'success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const findCityOpenCageBasedController = async (req, res) => {
  try {
    const { city } = req.query
    const result = await findCityOpenCageBasedService(city)
    return res.status(200).json({
      message: 'success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

//FIND OPENCAGE ADDRESS AND CITY FROM DATABASE COMBINED
export const findOpencageAndCityController = async (req, res) => {
  try {
    const { latitude, longitude } = req.query
    const addressResult = await opencageService(latitude, longitude)

    const cityName = addressResult.components.city || addressResult.components.county

    const cityResult = await findCityOpenCageBasedService(cityName)

    return res.status(200).json({
      message: 'success',
      address: addressResult.components,
      city: cityResult,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const findSearchableCityController = async (req, res) => {
  try {
    const { name } = req.query
    const result = await findSearchableCityService(name)
    return res.status(200).json({
      message: 'success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const findSearchableProvinceController = async (req, res) => {
  try {
    const { name } = req.query
    const result = await findSearchableProvinceService(name)
    return res.status(200).json({
      message: 'success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const createUserAddressController = async (req, res) => {
  try {
    const { id, latitude, longitude } = req.query
    const { specificAddress, cityId, fullName, phoneNumber, postalCode } = req.body
    const result = await createUserAddressService(
      id,
      specificAddress,
      cityId,
      fullName,
      phoneNumber,
      postalCode,
      latitude,
      longitude,
    )
    return res.status(200).json({
      message: 'success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

//UPDATE USER ADDRESS
export const updateUserAddressController = async (req, res) => {
  try {
    const { id } = req.params
    const { specificAddress, cityId, fullName, phoneNumber, postalCode } = req.body
    await updateUserAddressService(id, specificAddress, cityId, fullName, phoneNumber, postalCode)
    return res.status(200).json({
      message: 'success',
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const updateMainAddressController = async (req, res) => {
  try {
    const { id, userId } = req.query
    await updateMainAddressService(id, userId)
    return res.status(200).json({
      message: 'success',
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const deleteUserAddressController = async (req, res) => {
  try {
    const { id } = req.params
    await deleteUserAddressService(id)
    return res.status(200).json({
      message: 'success',
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
