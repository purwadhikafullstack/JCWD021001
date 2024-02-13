import axios from "axios";
import { API_ROUTE } from "../../../services/route";

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
        const response = await axios.post(`${API_ROUTE}/order`,
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
        return response.data.data
    } catch (err){
        alert("Error occurred")
    }
}