import UserAddress from '../models/userAddress.model'

//FIND
export const findMainUserAddressQuery = async (id) => {
    try{
        return await UserAddress.findOne(
            {where:
                {userId: id,
                isMainAddress: true},
            }
        )
    } catch (err){
        throw err;
    }
}

// POST 
export const createUserAddressQuery = async (id, specificAddress, cityId, fullName, phoneNumber) => {
    try{
        return await UserAddress.create(
            {   specificAddress,
                cityId,
                userId: id,
                fullName,
                phoneNumber,
            })
    } catch (err){
        throw err;
    }
}