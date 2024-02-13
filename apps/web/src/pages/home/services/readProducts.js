import axios from "axios";

export const getProducts = async (
  sortBy = 'name',
  orderBy = 'ASC',  
  page = 1, 
    pageSize = 8,
) => {
    try {
        const product = await axios.get(
          `${import.meta.env.VITE_API_URL}product?sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`,
        )
         return product?.data?.data
      } catch (err) {
        console.log(err.message);
      } 
}

export const getProductsDua = async (
  sortBy = 'name',
  orderBy = 'DESC',  
  page = 1, 
    pageSize = 8,
) => {
    try {
        const product = await axios.get(
          `${import.meta.env.VITE_API_URL}product?sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`,
        )
         return product?.data?.data
      } catch (err) {
        console.log(err.message);
      } 
}