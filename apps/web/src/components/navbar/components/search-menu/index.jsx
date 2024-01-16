import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const SearchMenu = () => {
  const [filter, setFilter] = useState('')
  const setInputFilter = (value) => {
    setFilter(value)
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Menu autoSelect={'false'} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <InputGroup>
        <Input
          w={'20em'}
          variant={'outline'}
          focusBorderColor={'lightgray'}
          placeholder={'Search a product here'}
          onChange={(e) => {
            filter ? onOpen() : null
            setInputFilter(e?.target?.value)
          }}
        />
        <InputRightElement>
          <Icon as={MagnifyingGlassIcon} />
        </InputRightElement>
      </InputGroup>
      <MenuList m={'5em 0 0 6em'} w={'20em'}>
        <MenuItem _hover={{ bgColor: 'transparent' }}>
          <Box>
            <Text>{filter.length >= 3 ? filter : 'Input mininum 3 character'}</Text>
          </Box>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
