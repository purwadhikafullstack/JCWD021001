import User from '../models/user.model';
import UserAddress from '../models/userAddress.model'
import City from '../models/city.model'
import Warehouse from '../models/warehouse.model';

import { Op } from 'sequelize';

// FIND
export const findUsernameQuery = async (username) => {
    try{
        return await User.findOne({where:
        {username}}
        )
    } catch (err){
        throw err;
    }
}
export const findEmailQuery = async (email) => {
    try{
        return await User.findOne({where:
        {email}})
    } catch (err){
        throw err;
    }
}


export const findAdminQuery = async () => {
    try{
        const res = await User.findAll({
            where: { roleId: 2 },
            include: [
                {
                    model: UserAddress,
                    include: [
                        {
                            model: City
                        }
                    ]
                },
                {
                    model: Warehouse
                }
            ]
        });
        return res
    } catch (err){
        throw err;
    }
}

export const findUserQuery = async () => {
    try{
        const res = await User.findAll({
            where:{roleId: 3}
        })
        return res
    } catch (err){
        throw err;
    }
}

//UPDDATE
export const updateUserQuery = async (id, username, email, password, roleId) => {
    try {
        await User.update(
            {username,
            email,
            password,
            roleId},
            {where:
                {id: id}
            }
        )
    } catch (err){
        throw err;
    }
}

export const updateUsernameQuery = async (id, username) => {
    try {
        await User.update(
            {username},
            {where:
                {id: id}
            }
        )
    } catch (err){
        throw err;
    }
}

export const updateEmailQuery = async (id, email) => {
    try {
        await User.update(
            {email},
            {where:
                {id: id}
            }
        )
    } catch (err){
        throw err;
    }
}

export const updatePasswordQuery = async (id, password) => {
    try {
        await User.update(
            {password},
            {where:
                {id: id}
            }
        )
    } catch (err){
        throw err;
    }
}

export const uploadAvatarFileQuery = async (id, avatar) => {
    try {
        await User.update(
            {avatar},
            {where:
                {id: id}}
        )
    } catch (err){
        throw err;
    }
}


//DESTROY
export const deleteUserQuery = async (id) => {
    try{
        await User.destroy(
            {where: {
                id: id
            }}
        )
    } catch (err){
        throw err;
    }
}