import axios from "axios";
import toast from "react-hot-toast";

export const createOrder = async ({
    userId,
    userAddressId,
    warehouseId,
    totalPrice,
    totalQuantity,
    shippingCost,
    orderStatusId,
    products,
  }) => {
    try {
        const response = await axios.post(" http://localhost:8000/api/order",
        {
            userId: userId,
            userAddressId: userAddressId,
            warehouseId: warehouseId,
            totalPrice: totalPrice,
            totalQuantity: totalQuantity,
            shippingCost: shippingCost,
            orderStatusId: orderStatusId,
            products: products,
        });
        toast.success("Order created")
        return response.data.data.order.id
    } catch (err){
        alert("Error occurred")
    }
}