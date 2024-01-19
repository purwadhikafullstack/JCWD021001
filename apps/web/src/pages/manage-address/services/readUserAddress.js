import axios from "axios"

export const findUserAddress = async (latitude, longitude) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/user-address/address-city?latitude=${latitude}&longitude=${longitude}`)
        const address = response.data
        console.log(address)
        return address
    } catch (err){
        console.log(err);
    }
}