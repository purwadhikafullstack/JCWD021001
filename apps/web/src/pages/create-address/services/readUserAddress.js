import axios from "axios";

export const getProvince = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/user-address/province",);
        const province = response?.data?.data

        return province

    } catch (err){
        console.log(err);
    }
}

export const getCity = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/user-address/city/${id}`)
        const city = response?.data?.data
        return city
    } catch (err){
        console.log(err);
    }
}

export const getAddressOpenCage = async (latitude, longitude) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/user-address/address?latitude=${latitude}&longitude=${longitude}`)
        const address = response?.data?.data?.components
        console.log("Ini address open cage", address)
        return address
    } catch (err){
        console.log(err);
    }
}


export const getCityOpenCageBased = async (city) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/user-address/city?city=${city}`)
        const cityData = response.data?.data
        console.log(cityData);
        return cityData
    } catch (err){
        console.log(err);
    }
}


export const findOpenCageAndCity = async (latitude, longitude) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/user-address/address-city?latitude=${latitude}&longitude=${longitude}`)
        const address = response.data
        console.log(address)
        return address
    } catch (err){
        console.log(err);
    }
}