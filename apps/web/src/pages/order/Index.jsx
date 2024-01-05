import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import { CreateOrder } from './services/CreateOrder'
import { CreatePayment } from './services/CreatePayment';

const Order = () => {
    const handleCheckout = async () => {
        try {
          const midtransToken = await CreateOrder();

          if (midtransToken) {
            const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js';
            const clientKey = import.meta.env.MIDTRANS_CLIENT_KEY;
            const script = document.createElement('script');
            script.src = snapScript;
            script.setAttribute('data-client-key', clientKey);
            // script.async = true;
    
            script.onload = () => {
              window.snap.pay(midtransToken, {
                onSuccess: function(result){
                  /* You may add your own implementation here */
                  alert("payment success!"); console.log(result);
                  CreatePayment(result)
                },
                onPending: function(result){
                  /* You may add your own implementation here */
                  alert("wating your payment!"); console.log(result);
                },
                onError: function(result){
                  /* You may add your own implementation here */
                  alert("payment failed!"); console.log(result);
                },
                onClose: function(){
                  /* You may add your own implementation here */
                  alert('you closed the popup without finishing the payment');
                }
              });
            };
            document.body.appendChild(script);
          } else {
            console.error('Failed to get Midtrans token');
          }
        } catch (error) {
          console.error('Error creating order:', error);
        }
      };

    return (
        <Box>
            <Button colorScheme='blue' onClick={handleCheckout}>Checkout</Button>
        </Box>
    )
}

export default Order