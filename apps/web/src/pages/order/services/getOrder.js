import axios from 'axios'

export const getOrder = async (orderNumber, orderDate, orderStatusId, page, pageSize) => {
  try {
    // console.log('page', page);
    // console.log('pageSize', pageSize);
    const response = await axios.get(`http://localhost:8000/api/order/1`, {
      params: {
        orderNumber: orderNumber,
        orderDate: orderDate,
        orderStatusId: orderStatusId,
        page: page,
        pageSize: pageSize
      
      },
    })
    // alert("payment created")
    return response.data.data
  } catch (err) {
    alert('Error occurred')
  }
}
