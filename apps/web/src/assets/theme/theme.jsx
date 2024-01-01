import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: 'Nunito',
    body: 'Nunito',
  },
  colors: {
    brand: {
      lightred: '#CC0244', //light-red (button-color)
      redhover: '#f50f5a',
      yellow: '#FF9900', //yellow (star-color)
      pastelred: '#DB6969', //red-pink (strikethrough-price)
      orange: '#FF5757', //orange (cart-order-color)
      grey100: '#F1F1F1', // grey-background
      grey200: '#C7C7C7', //grey line
      grey300: '#8A8282', // grey (font)
      grey350: '#707070', // grey-dark(font)
    },
    grey: {
      50: '#f2f2f2', //used
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d',
    },
  },
});
