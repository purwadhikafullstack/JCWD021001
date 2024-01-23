import axios from "axios";

export const updateUserAddress = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode) => {
    try{
        await axios.patch(`http://localhost:8000/api/user-address/update-user-address/${id}`, {
            specificAddress, 
            cityId, 
            fullName, 
            phoneNumber, 
            postalCode  
        })
    } catch (err){
        console.log(err);
    }
}

export const updateMainAddress = async (id, userId) => {
    try{
        await axios.patch (`http://localhost:8000/api/user-address/update-main-address?id=${id}&userId=${userId}`)
    } catch (err){
        console.log(err);
    }
}