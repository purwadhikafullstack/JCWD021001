import axios from "axios";

export const getProducts = async (
    page = 1, 
    pageSize = 8,
) => {
    try {
        const product = await axios.get(
          `http://localhost:8000/api/product?page=${page}&pageSize=${pageSize}`,
        )
        console.log(product);
         return product?.data?.data
      } catch (err) {
        console.log(err.message);
      }
      
}