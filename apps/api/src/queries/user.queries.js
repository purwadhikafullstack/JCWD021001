import User from '../models/user.model';
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

//UPDATE
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