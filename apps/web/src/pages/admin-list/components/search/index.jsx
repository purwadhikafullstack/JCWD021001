import { InputGroup, Input, InputRightElement, Icon } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const SearchAdmin = () => {
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
        width={'375px'}
        bg={'white'}
        variant={'outline'}
        focusBorderColor={'lightgray'}
        placeholder={'Search user here'}
        h={'48px'}
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
