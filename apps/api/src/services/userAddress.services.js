import { findMainUserAddressQuery, createUserAddressQuery } from "../queries/userAddress.queries";

export const findMainUserAddressService = async (id) => {
    try{
        const res = await findMainUserAddressQuery(id)
        return res
    } catch (err){
        throw err
    }
}

export const createUserAddressService = async (id, specificAddress, cityId, fullName, phoneNumber) => {
    try {
        const res = await createUserAddressQuery(id, specificAddress, cityId, fullName, phoneNumber)
        return res
    } catch (err){
        throw err
    }
}