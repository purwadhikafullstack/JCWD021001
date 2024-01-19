import { Box, Flex, Text } from "@chakra-ui/react";

function MainAddress (){

    return (
        <Flex width={'100%'}
        flexWrap={'wrap'}
        flexDir={'column'}
        borderRadius={'12px'}
        border= {'1px solid #818181'}
        bg={'white'}
        padding={'24px'}>
            <Flex gap={'24px'}
            alignItems={'center'}
            mb={'24px'}>
                <Text fontSize={'16px'}
                fontWeight={'700'}
                color={'black'}>
                    Xavier Steven Domanique
                </Text>
                <Box padding={'10px'}
                bg={'#FFE9F0'}
                borderRadius={'8px'}
                fontSize={'16px'}
                fontWeight={'700'}
                color={'brand.lightred'}>
                    Main
                </Box>
            </Flex>
            <Text fontSize={'14px'}
            fontWeight={'400'}
            mb={'16px'}>
                081234567890
            </Text>
            <Text fontSize={'14px'}
            fontWeight={'600'}
            color={'brand.grey350'}>
                Jl. Suryodiningratan No. 37B, Suryodiningratan, Kec. Mantrijeron, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55141, Indonesia
            </Text>
        </Flex>
    )
}

export default MainAddress