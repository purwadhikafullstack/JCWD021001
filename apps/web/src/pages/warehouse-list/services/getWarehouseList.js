
import axios from "axios";
import toast from "react-hot-toast";

const token = localStorage.getItem("token")

export const getWarehouseList = async ( 
  name ='',
  provinceId = '',  
  page = 1,
  pageSize = 10,
  sortField = 'name',
  sortOrder = 'ASC') => {
    
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}warehouse/list?name=${name}&provinceId=${provinceId}&page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`, 
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

export const getProvince = async (name) => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/province-list?name=${name}`)
    return response?.data?.data
    
  } catch (err){
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast.error(errorMessage)
  }
}

export const getWarehouseAdmin = async (warehouseId) => {
  try {
    const response  = await axios.get(`${import.meta.env.VITE_API_URL}warehouse/admin/${warehouseId}`, 
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

export const getUnasignedAdmin = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}warehouse/unassigned-admin`, 
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


export const findOpenCageAndCity = async (latitude, longitude) => {
  try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/address-city?latitude=${latitude}&longitude=${longitude}`)
      const address = response.data
      console.log(address)
      return address
  } catch (err){
    const errorMessage =
    err.response && err.response.data && err.response.data.message
      ? err.response.data.message
      : 'An unexpected error occurred'
  toast.error(errorMessage)
  }
}

export const getProvinceWarehouse = async () => {
  try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/province`,);
      const province = response?.data?.data
      
      return province

  } catch (err){
    const errorMessage =
    err.response && err.response.data && err.response.data.message
      ? err.response.data.message
      : 'An unexpected error occurred'
  toast.error(errorMessage)
  }
}

export const getCity = async (id) => {
  try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}user-address/city/${id}`)
      const city = response?.data?.data
      return city
  } catch (err){
    const errorMessage =
    err.response && err.response.data && err.response.data.message
      ? err.response.data.message
      : 'An unexpected error occurred'
  toast.error(errorMessage)
  }
}
