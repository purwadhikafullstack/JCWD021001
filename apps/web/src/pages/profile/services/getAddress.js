import axios from "axios";

export const getMainAddres = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/main-address/${id}`)
        return response.data?.data
    } catch (err){
        console.log(err);
    }
}