import { ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, HStack, Icon, Text } from '@chakra-ui/react'

export const SidebarButton = (props) => {
  return (
    <Box
      bgColor={props?.active ? 'redPure.500' : 'transparent'}
      variant="ghost"
      onClick={props?.onClick}
    >
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <HStack>
          <Icon as={props?.icon} />
          <Text>{props?.label}</Text>
        </HStack>
        <Icon as={ChevronUpIcon} />
      </Flex>
    </Box>
  )
}
