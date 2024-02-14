import { InputGroup, Input, InputRightElement, Icon, useDisclosure } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SearchInput = (props) => {
  // FILTER
  const [filter, setFilter] = useState('')

  //   HANDLE KEY PRESS

  return (
    <InputGroup>
      <Input
        id={'exclude'}
        w={{ base: '9em', lg: '20em' }}
        variant={'outline'}
        bg={'white'}
        border={'1px solid lightgray'}
        focusBorderColor={'lightgray'}
        placeholder={'Search a product here'}
        onChange={(e) => {
          props?.setProductNameFilter(e.target.value)
          setFilter(e?.target?.value)
        }}
        value={filter}
      />
      <InputRightElement>
        <Icon as={MagnifyingGlassIcon} />
      </InputRightElement>
    </InputGroup>
  )
}
