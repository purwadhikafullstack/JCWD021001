import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

function FilterAdmin (){
    return (
        <Box>
            <Button h={'48px'}
            w={'171px'}
            padding={'12px 12px 12px 16px'}
            bg={'white'}
            _hover={'none'}>
                <Flex w={'100%'}
                justifyContent={'space-between'}>
                    <Text fontSize={'12px'}
                    fontWeight={'600'}>
                        Filter by
                    </Text>
                    <Icon as={AdjustmentsHorizontalIcon} boxSize={'18px'}/>
                </Flex>
            </Button>
        </Box>
    )
}

export default FilterAdmin;