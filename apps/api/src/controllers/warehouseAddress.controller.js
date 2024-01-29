import { findWarehouseAddressService, getShippingCostService } from "../services/warehouseAddrress.services";

export const findWarehouseAddressController = async (req, res) => {
    try{
        const {provinceId, userLat, userLong} = req.query
        const result = await findWarehouseAddressService(provinceId, userLat, userLong)
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

export const getShippingCostController = async (req, res) => {
    try{
        const {origin, destination, weight, courier} = req.body
        const result = await getShippingCostService(origin, destination, weight, courier)
        return res.status(200).json({
            message: "success",
            data: result
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
}