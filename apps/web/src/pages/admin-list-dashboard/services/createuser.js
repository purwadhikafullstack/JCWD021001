import axios from "axios"

export const createUser = async (email, username, roleId, setLoading) => {
    const token = localStorage.getItem("token")
    try {
        setLoading(true)
        const response = await axios.post('http://localhost:8000/api/user/', {
            email, 
            username, 
            roleId
        },
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setLoading(false)
        return response?.data?.data
    } catch (err){
        setLoading(false)
        console.log(err);
    }
}