import { createCartQuery, deleteCartQuery, findCartQuery, findCartUserQuery, getCartQuery, updateCartQuery } from "../queries/carts.queries";

export const createCartService = async (userId, stockId, price, quantity) => {
    try {
        const calcPrice = price * quantity;
        const res = await createCartQuery(userId, stockId, calcPrice, quantity);
        return res;
    } catch (err) {
        throw err;
    }
}

export const updateCartService = async (cartProductId, quantity) => {
    try {
        const existingCartProduct = await findCartQuery(cartProductId);
        if (!existingCartProduct) throw new Error("Cart product not found");
    
        const productPrice = existingCartProduct.Stock.Product.price || 0;
        const quantityDifference = quantity - existingCartProduct.quantity;
        const calcPrice = productPrice * quantityDifference;

        const updatedCartProduct = await updateCartQuery(cartProductId, calcPrice, quantityDifference);

        return updatedCartProduct;
    } catch (error) {
        throw error;
    }
}

// export const deleteCartService = async (cartProductId) => {
//     try {
//         const check = await findCartQuery(cartProductId);
//         if (!check) throw new Error("Cart product not found");
//         const res = await deleteCartQuery(cartProductId, check.cartId);
//         return res;
//     } catch (err) {
//         throw err;
//     }
// }
export const deleteCartService = async (cartProductIds) => {
    try {
      const results = [];
      for (const cartProductId of cartProductIds) {
        const check = await findCartQuery(cartProductId);
        if (!check) {
          throw new Error(`Cart product with ID ${cartProductId} not found`);
        }
        const res = await deleteCartQuery(cartProductId, check.cartId);
        results.push(res);
      }
      return results;
    } catch (err) {
      throw err;
    }
  };

export const getCartService = async (userId) => {
    try {
        const check = await findCartUserQuery(userId);
        if (!check) throw new Error("Data doesnt exist");
        const res = await getCartQuery(userId)
        return res
    } catch (err) {
        throw err
    }
}

