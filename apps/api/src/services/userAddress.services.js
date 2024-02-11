import UserAddress from '../models/userAddress.model'
import { Op } from 'sequelize';
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
  findSearchableProvinceQuery,
  findMainAddressQuery
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

export const findMainAddressService = async (id) => {
  try{
    return await findMainAddressQuery(id)
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
    const mainAddress = await findMainAddressQuery(id);
    let isMainAddress = false;

    if (!mainAddress) {
      isMainAddress = true;
    }

    const res = await createUserAddressQuery(
      id,
      specificAddress,
      cityId,
      fullName,
      phoneNumber,
      postalCode,
      latitude,
      longitude,
      isMainAddress,
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


export const deleteUserAddressService = async (id, userId) => {
  try {
    const addressToDelete = await UserAddress.findByPk(id);
    const addressesCount = await UserAddress.count({
      where: { userId: userId },
    });

    if (addressToDelete && addressesCount <= 1) {
      await deleteUserAddressQuery(id);
      return; 
    }

    if (addressToDelete && addressToDelete.isMainAddress) {
      await deleteUserAddressQuery(id);
      if (addressesCount > 1) {
        const anotherAddress = await UserAddress.findOne({
          where: {
            userId: userId,
            id: { [Op.ne]: id }, 
          },
          order: [['createdAt', 'ASC']], 
        });

        if (anotherAddress) {
          anotherAddress.isMainAddress = true;
          await anotherAddress.save();
        }
      }
    } else {
      await deleteUserAddressQuery(id);
    }
  } catch (err) {
    throw err;
  }
};

