import { updateUsernameQuery, updateEmailQuery, updatePasswordQuery, findUsernameQuery, findEmailQuery, uploadAvatarFileQuery } from "../queries/user.queries";
import bcrypt from "bcrypt"
export const updateUsernameService = async (id, username) => {
    try{
        const check = await findUsernameQuery(username);
        if (check) throw new Error("Username already exist");
        await updateUsernameQuery(id, username)
    } catch (err){
        throw err
    }
}
export const updateEmailService = async (id, email) => {
    try{
        const check = await findEmailQuery(email);
        if (check) throw new Error("Email already exist");
        await updateEmailQuery(id, email)
    } catch (err){
        throw err
    }
}
export const updatePasswordService = async (id, password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await updatePasswordQuery(id, hashPassword)
        
    } catch (err){
        throw err
    }
}

export const uploadAvatarFileService = async (id, avatar) => {
    try{
        await uploadAvatarFileQuery(id, avatar);
    } catch (err){
        throw err
    }
}