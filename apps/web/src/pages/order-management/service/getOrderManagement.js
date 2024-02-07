import axios from 'axios'

export const getOrderManagement = async (
  orderNumber,
  orderDate,
  warehouseId,
  orderStatusId,
  page,
  pageSize,
) => {
  try {
    // console.log('orderNumber', orderNumber);
    // console.log('orderDate', orderDate);
    // console.log('warehouseId', warehouseId);
    const response = await axios.get(`http://localhost:8000/api/order/management`, {
      params: {
        orderNumber: orderNumber,
        orderDate: orderDate,
        warehouseId: warehouseId,
        orderStatusId: orderStatusId,
        page: page,
        pageSize: pageSize,
      },
    })
    // alert("payment created")
    return response.data.data
  } catch (err) {
    alert('Error occurred')
  }
}
