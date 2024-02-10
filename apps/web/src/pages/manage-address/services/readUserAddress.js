import axios from "axios"

export const findUserAddress = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/user-address/address/1`)
        const address = response.data?.data
        return address
    } catch (err){
        console.log(err);
    }
}