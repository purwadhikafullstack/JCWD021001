import axios from "axios";

export const createRequestReset = async (email, setLoading, openSuccessModal, openErrorModal) => {
    try {
        setLoading(true);
        await axios.post(`${import.meta.env.VITE_API_URL}auth/new-unverified-email`,
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

