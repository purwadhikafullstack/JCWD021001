import { InputGroup, Input, InputRightElement, Icon, useDisclosure } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const SearchMenu = () => {
  const [filter, setFilter] = useState('')
  const setInputFilter = (value) => {
    setFilter(value)
  }
  const navigate = useNavigate()
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?q=${filter}`)
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
