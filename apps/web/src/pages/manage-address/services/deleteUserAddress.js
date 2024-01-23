import axios from "axios"

export const deleteUserAddress = async (id) => {
    try{
        await axios.delete(`http://localhost:8000/api/user-address/delete-user-address/${id}`)
    } catch (err){
        console.log(err.message);
    }
}