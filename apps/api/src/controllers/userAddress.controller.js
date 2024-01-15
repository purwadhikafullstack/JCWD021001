import { findMainUserAddressService, createUserAddressService, findProvinceService, findCityService, opencageService } from "../services/userAddress.services";

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

export const findProvinceController = async (req, res) => {
    try{ const result = await findProvinceService()
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

export const findCityController = async (req, res) => {
    try{
        const {id} = req.params
        const result = await findCityService(id)
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

export const opencageController = async (req, res) => {
    try{
        const {latitude, longitude} = req.query
        const result = await opencageService(latitude, longitude)
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

export const createUserAddressController = async (req, res) => {
    try{
        const {id} = req.params
        console.log("ini id",id)
        const { specificAddress, cityId, fullName, phoneNumber} = req.body
        const result = await createUserAddressService (id, specificAddress, cityId, fullName, phoneNumber)
        return res.status(200).json({
            message: "success",
            data: result
        })
    } catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
}