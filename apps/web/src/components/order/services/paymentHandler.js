import { createPayment } from '../../../pages/order/services/createPayment'
import { createOrder } from '../../../pages/order/services/createOrder'
import { deleteCart } from '../../../pages/cart/services/deleteCart'
import toast from 'react-hot-toast'

export const paymentHandler = async (
  order,
  stockOrder,
  selectedAddress,
  nearestWarehouse,
  costResult,
  totalPrice,
  totalQuantity,
  navigate,
  fetchCartCount,
) => {
  try {
    const mappedProducts = order.CartProducts.map((product) => {
      const stockId = stockOrder.find((product) => product?.warehouseId == nearestWarehouse?.id)
     
      return {
        stockId: stockId?.id,
        productId: product?.product?.id,
        quantity: product?.quantity,
        price: parseFloat(product?.price),
        priceProduct: product?.product?.price,
      }
    })
    const dataOrder = {
      userId: order?.User?.id,
      userAddressId: selectedAddress?.id,
      warehouseId: nearestWarehouse?.id,
      totalPrice: parseFloat(totalPrice),
      totalQuantity: totalQuantity,
      shippingCost: costResult,
      orderStatusId: 1,
      products: mappedProducts,
    }

    const result = await createOrder(dataOrder)
    await deleteCart(order.CartProducts.map((product) => product.id))
    localStorage.removeItem('productData')
    await fetchCartCount()
    const midtransToken = result?.midtransToken
    const orderId = result?.order?.id

    if (midtransToken) {
      const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
      const clientKey = import.meta.env.MIDTRANS_CLIENT_KEY
      const script = document.createElement('script')
      script.src = snapScript
      script.setAttribute('data-client-key', clientKey)
      // script.async = true;

      script.onload = () => {
        window.snap.pay(midtransToken, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            // console.log(result)
            createPayment(result, orderId)
            // toast.success('Payment success!')
            navigate('/order-list', { state: { refresh: true, activeTab: 1, status: [2, 3] } })
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            createPayment(result, orderId)
            toast.success('Wating your payment!')
            navigate('/order-list', { state: { refresh: true, activeTab: 0, status: [1] } })
          },
          onError: function (result) {
            /* You may add your own implementation here */
            toast.error('Payment failed!')
          },
          onClose: function () {
            /* You may add your own implementation here */
            toast.error('you closed the popup without finishing the payment')
          },
        })
      }
      document.body.appendChild(script)
    } else {
      toast.error('Failed Midtrans')
    }
  } catch (err) {
    toast.error(err)
  }
}
