import axios from "axios";
import toast from "react-hot-toast";


function getQueryParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const token = getQueryParam('token')
export const verification = async (password) => {
    try {
        await axios.put(`http://localhost:8000/api/auth/email-verification?token=${encodeURIComponent(token)}`,
        {
            password,
        });
        toast.success("Email verified and password is set successfully")
    } catch (err){
        toast.error("Error occurred")
    }
}

