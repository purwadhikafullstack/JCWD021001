import axios from "axios";
import toast from "react-hot-toast";

export const CreatePayment = async (result) => {
    try {
        const response = await axios.post("http://localhost:8000/api/payment",
        {
            orderId: result.order_id,
            paymentCode: result.transaction_id,
            grossAmount: result.gross_amount,
            paymentDate: result.transaction_time,
            paymentMethod: result.payment_type,
            paymentStatus: result.transaction_status,
            paymentMessage: result.status_message,
        });
        alert("payment created")
    } catch (err){
        alert("Error occurred")
    }
}
