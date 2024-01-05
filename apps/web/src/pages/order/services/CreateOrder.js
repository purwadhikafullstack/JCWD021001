import axios from "axios";
import toast from "react-hot-toast";

export const CreateOrder = async () => {
    try {
        const response = await axios.post(" http://localhost:8000/api/order",
        {
            userId: 1,
            userAddressId: 1,
            warehouseId: 1,
            totalPrice: 300000,
            totalQuantity: 4,
            shippingCost: 20000,
            orderStatusId: 1,
            products: [
                {
                    productId: 1,
                    price: 50000,
                    quantity: 2
                },
                {
                    productId: 2,
                    price: 100000,
                    quantity: 2
                },
                
              ]
        });
        // console.log(response.data.data.midtransToken);
        toast.success("Order created")
        return response.data.data.midtransToken
    } catch (err){
        toast.error("Error occurred")
    }
}