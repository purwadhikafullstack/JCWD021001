import axios from "axios";
import toast from "react-hot-toast";

export const register = async (email, username) => {
    try {
        await axios.post("http://localhost:8000/api/auth/user-registration",
        {
            email,
            username
        });
        toast.success("Account created")
    } catch (err){
        toast.error("Error occurred")
    }
}

