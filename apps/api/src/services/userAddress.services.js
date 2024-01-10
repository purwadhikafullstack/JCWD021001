import { findMainUserAddressQuery } from "../queries/userAddress.queries";

export const findMainUserAddressService = async (id) => {
    try{
        const res = await findMainUserAddressQuery(id)
        return res
    } catch (err){
        throw err
    }
}