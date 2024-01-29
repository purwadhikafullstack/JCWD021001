import axios from "axios";

export const createUserAddress = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode, latitude, longitude) => {
try{ 
    await axios.post(`http://localhost:8000/api/user-address/create-user-address?id=${id}&latitude=${latitude}&longitude=${longitude}`, {
    specificAddress,
    cityId,
    fullName,
    phoneNumber,
    postalCode
    });
    } catch (err){
        console.log(err)
    }
}