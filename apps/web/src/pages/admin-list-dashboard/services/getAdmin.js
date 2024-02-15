

import axios from "axios";
import toast from "react-hot-toast";

export const getAdminList = async ( 
  warehouseId='',
  cityId='',
  username='',
  page = 1,
  pageSize = 10,
  sortField = 'roleName',
  sortOrder = 'DESC') => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}user?warehouseId=${warehouseId}&cityId=${cityId}&username=${username}&page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        return response?.data?.data
    } catch (err){
      const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
    }
}

export const getCity = async (name) => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address?name=${name}`)
    
    return response?.data?.data
    
  } catch (err){
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
  }
}

export const getWarehouse = async (name) => {
  try{
    const token = localStorage.getItem("token")
    const response = await axios.get(`${import.meta.env.VITE_API_URL}warehouse?name=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    return response?.data?.data
    
  } catch (err){
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
  }
}