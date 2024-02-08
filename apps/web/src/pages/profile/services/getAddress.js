import axios from "axios";

export const getMainAddres = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/user-address/main-address/${id}`)
        return response.data?.data
    } catch (err){
        console.log(err);
    }
}