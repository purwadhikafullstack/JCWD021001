import axios from "axios";
import toast from "react-hot-toast";

export const login = async (email, password) => {
    try {
        await axios.post("http://localhost:8000/api/auth/login",
        {
            email,
            password
        });
        toast.success("Account created");
    } catch (err){
        toast.error("Error occurred")
    }
}

