import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
        heading: "Nunito",
        body: "Nunito",
    },
    colors:{
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
            
        }
    },
    breakpoints: {
        base: "0em", // 0px
        sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
        md: "48em", // ~768px
        lg: "62em", // ~992px
        xl: "80em", // ~1280px
        "2xl": "96em", // ~1536px
    }
})