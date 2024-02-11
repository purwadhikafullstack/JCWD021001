import { ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, HStack, Icon, Text } from '@chakra-ui/react'

export const SidebarButton = (props) => {
  return (
    <Box variant="ghost">
      <Flex alignItems={'center'} justifyContent={'space-between'} cursor={'pointer'}>
        <HStack>
          <Icon as={props?.icon} />
          <Text>{props?.label}</Text>
        </HStack>
        <Icon as={ChevronUpIcon} />
      </Flex>
    </Box>
  )
}
