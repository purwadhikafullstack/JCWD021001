import { InputGroup, Input, InputRightElement, Icon, useDisclosure } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
export const SearchInput = (props) => {
  // FILTER
  const [filter, setFilter] = useState('')

  //   INPUT FILTER
  const setInputFilter = (value) => {
    setFilter(value)
  }

  //   HANDLE KEY PRESS
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props?.setProductNameFilter(filter)
    }
  }

  return (
    <InputGroup>
      <Input
        w={'20em'}
        variant={'outline'}
        focusBorderColor={'lightgray'}
        placeholder={'Search a product here'}
        onChange={(e) => {
          setInputFilter(e?.target?.value)
        }}
        value={filter}
        onKeyDown={handleKeyPress}
      />
      <InputRightElement>
        <Icon as={MagnifyingGlassIcon} />
      </InputRightElement>
    </InputGroup>
  )
}
