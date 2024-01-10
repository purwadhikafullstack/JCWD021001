import { findMainUserAddressService } from "../services/userAddress.services";

export const findMainUserAddressController = async (req, res) => {
    try{
        const {id} = req.params
        const result = await findMainUserAddressService(id)
        return res.status(200).json({
            message: "success",
            data: result
        });
    } catch (err){
        return res.status(500).json({
            message: err.message
        });        
    }
}