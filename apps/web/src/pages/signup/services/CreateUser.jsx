import axios from "axios";


export const register = async (email, username, setLoading, openSuccessModal, openErrorModal) => {
    try {
        setLoading(true);
        await axios.post("http://localhost:8000/api/auth/user-registration",
        {
            email,
            username
        });
        setLoading(false);
        openSuccessModal();
        console.log("success");
    } catch (err){
        setLoading(false);
        openErrorModal();
        console.log("ini errornya", err.message);
    }
}

