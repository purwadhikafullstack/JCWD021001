import axios from "axios";


function getQueryParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const token = getQueryParam('token')
export const verification = async (password, setLoading, openSuccessModal, openErrorModal) => {
    try {
        setLoading(true);
        await axios.put(`http://localhost:8000/api/auth/email-verification?token=${encodeURIComponent(token)}`,
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

