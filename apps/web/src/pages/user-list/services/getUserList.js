
import axios from "axios";

export const getUserList = async ( 
  cityId='',
  isVerified='',
  username='',
  page = 1,
  pageSize = 10,
  sortField = 'username',
  sortOrder = 'ASC') => {
    const token = localStorage.getItem("token")
    try {
        const response = await axios.get(`http://localhost:8000/api/user/user-list?cityId=${cityId}&isVerified=${isVerified}&username=${username}&page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        return response?.data?.data
    } catch (err){
        console.log(err);
    }
}

export const getCity = async (name) => {
  try{
    const response = await axios.get(`http://localhost:8000/api/user-address?name=${name}`)
    console.log("ini city", response);
    return response?.data?.data
    
  } catch (err){
    console.log(err);
  }
}

// export const getWarehouse = async (name) => {
//   try{
//     const response = await axios.get(`http://localhost:8000/api/warehouse?name=${name}`)
//     console.log("ini city", response);
//     return response?.data?.data
    
//   } catch (err){
//     console.log(err);
//   }
// }