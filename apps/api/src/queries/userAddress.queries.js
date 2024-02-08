import UserAddress from '../models/userAddress.model'
import Province from '../models/province.model'
import City from '../models/city.model'
import opencage from 'opencage-api-client'
import { Op } from 'sequelize';

//FIND
export const findUserAddressQuery = async (userId) => {
    try {
        return await UserAddress.findAll({
            where: { userId: userId },
            include: [
                {
                    model: City,
                    attributes: ['name'], 
                    include: [
                        {
                            model: Province,
                            attributes: ['name', 'id'] 
                        }
                    ]
                }
            ]
        });
    } catch (err) {
        throw err;
    }
};

export const findProvinceQuery = async () => {
    try{
        return await Province.findAll()
    } catch (err){
        throw err;
    }
}

export const findCityQuery = async (id) => {
    try{
        return await City.findAll(
            {where:{
                provinceId: id
            }}
        )
    } catch (err){
        throw err
    }
}

// FIND ADDRESS FROM OPENCAGE API

export const opencageQuery = async (latitude, longitude, API_KEY) => {
    try{
        const response = await opencage.geocode({ q: `${latitude}, ${longitude}`,
        key: API_KEY,
        language: 'en' })
        return response.results[0]
    } catch (err){
        throw err
    }
}

// FIND CITY BASED ON OPENCAGE DATA

export const findCityOpenCageBasedQuery = async (city) => {
    try{
        return await City.findOne(
            {where : {
                name: {[Op.substring]: city}
            }})
        
    } catch (err){
        throw err
    }
}

//FIND SEARCHABLE CITY
export const findSearchableCityQuery = async (name) => {
    try {
        const search = {
            where: {
                name : {
                    [Op.like] : `%${name}%`
                }
            }
        }
        const res = await City.findAll(search)
        return res
    } catch (err){
        throw err
    }
}

//FIND SEARCHABLE PROVINCE
export const findSearchableProvinceQuery = async (name) => {
    try {
        const search = {
            where: {
                name : {
                    [Op.like] : `%${name}%`
                }
            }
        }
        const res = await Province.findAll(search)
        return res
    } catch (err){
        throw err
    }
}

//FIND MAIN ADDRESS
export const findMainAddressQuery = async (id) => {
    try {
        return await UserAddress.findOne({
            where: { userId: id, isMainAddress: true },
            include: [
                {
                    model: City,
                    attributes: ['name'], 
                    include: [
                        {
                            model: Province,
                            attributes: ['name', 'id'] 
                        }
                    ]
                }
            ]
        })
    } catch (err){
        throw err
    }
}

// POST 
export const createUserAddressQuery = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode, latitude, longitude) => {
    try{
        return await UserAddress.create(
            {   specificAddress,
                cityId,
                userId: id,
                fullName,
                phoneNumber,
                postalCode,
                latitude, 
                longitude
            })
    } catch (err){
        throw err;
    }
}

//UPDATE

export const updateUserAddressQuery  = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode) => {
    try {
        await UserAddress.update(
            {specificAddress, cityId, fullName, phoneNumber, postalCode},
            {where:
                {id: id}
            }
        )
    } catch (err){
        throw err;
    }
}

export const updateMainAddressQuery = async (id) => {
    try{
        await UserAddress.update(
            {isMainAddress: true},
            {where: 
            {id: id}}
        )
    } catch (err){
        throw err;
    }
}

export const removeMainAddressQuery = async (userId) => {
    try{
        await UserAddress.update(
            {isMainAddress: false},
            {where: 
            {userId: userId,
            isMainAddress: true}}
        )
    } catch (err){
        throw err;
    }
}

//DELETE
export const deleteUserAddressQuery = async (id) => {
    try{
        await UserAddress.destroy(
            {where: {
                id: id
            }}
        )
    } catch (err){
        throw err;
    }
}