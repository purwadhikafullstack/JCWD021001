import { InputGroup, Input, InputRightElement, Icon } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export const SearchUserList = ({setUsername}) => {
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
        placeholder={'Search user here'}
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
