import { createPayment } from '../../../pages/order/services/createPayment'
import { createOrder } from '../../../pages/order/services/createOrder'

export const paymentHandler = async (
  order,
  selectedAddress,
  totalPrice,
  totalQuantity,
  navigate,
) => {
  try {
    const dataOrder = {
      userId: order?.User?.id,
      userAddressId: selectedAddress?.id || 1,
      warehouseId: 1,
      totalPrice: parseFloat(totalPrice),
      totalQuantity: totalQuantity,
      shippingCost: 20000,
      orderStatusId: 1,
      products: order.CartProducts.map((product) => ({
        stockId: 1,
        productId: product?.product?.id,
        quantity: product?.quantity,
        price: parseFloat(product?.price),
        priceProduct: product?.product?.price,
      })),
    }

    const result = await createOrder(dataOrder)
    // console.log('asdasda', result);
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
            // alert('payment success!')
            console.log(result)
            // CreatePayment(result, orderId)
            // navigate('/order-list', { state: { refresh: true, activeTab: 1 } })
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            alert('wating your payment!')
            CreatePayment(result, orderId)
            navigate('/order-list', { state: { refresh: true, activeTab: 0 } })
          },
          onError: function (result) {
            /* You may add your own implementation here */
            alert('payment failed!')
            console.log(result)
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment')
          },
        })
      }
      document.body.appendChild(script)
    } else {
      console.error('Failed to get Midtrans token')
    }
  } catch (error) {
    console.error('Error creating order:', error)
  }
}

