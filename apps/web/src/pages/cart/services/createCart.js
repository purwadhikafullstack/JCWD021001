import axios from 'axios'

export const createCart = async (items) => {
  try {
    const response = await axios.post(' http://localhost:8000/api/cart', {
      userId: items?.userId,
      productId: items?.productId,
      colourId: items?.colourId,
      sizeId: items?.sizeId,
      price: items?.price,
      quantity: items?.quantity,
    })
  } catch (err) {
    throw err
  }
}
