import axios from "axios";


function getQueryParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const token = getQueryParam('token')
export const emailVerification = async (password, setLoading, openSuccessModal, openErrorModal) => {
    try {
        setLoading(true);
        await axios.put(`${import.meta.env.VITE_API_URL}auth/reset-password?token=${encodeURIComponent(token)}`,
        {
            password,
        });
        openSuccessModal();
        setLoading(false);
    } catch (err){
        openErrorModal();
        setLoading(false);
    }
}

