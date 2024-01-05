import { createPaymentService } from "../services/payments.services";

const sendResponse = (res, statusCode, result, errorMessage) => {
    if (statusCode === 200) {
        return res.status(statusCode).json({
            message: 'success',
            data: result,
        });
    } else if (statusCode === 500) {
        return res.status(statusCode).json({
            message: 'error',
            error: errorMessage,
        });
    } 
};

export const createPaymentController = async (req, res) => {
    try {
        const { orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage } = req.body
        const result = await createPaymentService(orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage)
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}