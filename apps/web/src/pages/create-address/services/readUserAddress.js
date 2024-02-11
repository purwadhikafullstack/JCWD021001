import axios from "axios";

export const getProvince = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-address/province`,);
        const province = response?.data?.data

        return province

    } catch (err){
        console.log(err);
    }
}

export const getCity = async (id) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-address/city/${id}`)
        const city = response?.data?.data
        return city
    } catch (err){
        console.log(err);
    }
}


export const findOpenCageAndCity = async (latitude, longitude) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user-address/address-city?latitude=${latitude}&longitude=${longitude}`)
        const address = response.data
        console.log(address)
        return address
    } catch (err){
        console.log(err);
    }
}