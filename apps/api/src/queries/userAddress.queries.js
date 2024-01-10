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