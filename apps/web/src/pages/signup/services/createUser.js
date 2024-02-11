import axios from "axios";


export const registerFunction = async (email, username, setLoading, openSuccessModal, openErrorModal) => {
    try {
        setLoading(true);
        await axios.post(`${import.meta.env.VITE_API_URL}auth/user-registration`,
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

