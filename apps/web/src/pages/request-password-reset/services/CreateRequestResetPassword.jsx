import axios from "axios";

export const createRequest = async (email, setLoading, openSuccessModal, openErrorModal) => {
    try {
        setLoading(true);
        await axios.post("http://localhost:8000/api/auth/request-password-reset",
        {
            email,
        });
        setLoading(false);
        openSuccessModal();
    } catch (err){
        openErrorModal();
        setLoading(false);
    }
}

