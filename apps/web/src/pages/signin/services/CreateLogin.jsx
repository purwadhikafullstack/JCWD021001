import axios from "axios";


export const login = async (email, password) => {
    try {
        await axios.post("http://localhost:8000/api/auth/login",
        {
            email,
            password
        });
        // toast.success("Account created");
    } catch (err){
        // toast.error("Error occurred")
    }
}

