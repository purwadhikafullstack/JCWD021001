import axios from "axios";

export const getNearestWarehouse = async (provinceId, userLat, userLong) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/warehouse-address/nearest-warehouse?provinceId=${provinceId}&userLat=${userLat}&userLong=${userLong}`,);
        const warehouse = response?.data?.data
        console.log("ini warehouse", warehouse);
        return warehouse

    } catch (err){
        console.log(err);
    }
}

export const getShippingCost = async (origin, destination, weight, courier) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/warehouse-address/shipping-cost`, {
            origin,
            destination,
            weight,
            courier
        })
        return response?.data?.data
    } catch(err){
        console.log(err);
    }
}