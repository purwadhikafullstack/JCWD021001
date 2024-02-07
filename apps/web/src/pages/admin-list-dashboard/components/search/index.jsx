import { InputGroup, Input, InputRightElement, Icon } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const SearchAdmin = ({setUsername}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => setInputValue(event.target.value);

  useEffect(() => {
    setUsername(inputValue);
  }, [inputValue, setUsername]);
  
  return (
    <InputGroup>
      <Input
        bg={'white'}
        variant={'outline'}
        focusBorderColor={'lightgray'}
        placeholder={'Search admin here'}
        h={{base: '38px', md: '48px'}}
        value={inputValue}
        onChange={handleInputChange}
      />
      <InputRightElement>
        <Icon as={MagnifyingGlassIcon} />
      </InputRightElement>
    </InputGroup>
  )
}
