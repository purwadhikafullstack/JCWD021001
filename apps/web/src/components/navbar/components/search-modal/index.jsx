import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const SearchModal = (props) => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)
  const [filter, setFilter] = useState('')
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?q=${filter}`)
    }
  }
  return (
    <Box>
      <Icon as={MagnifyingGlassIcon} display={{ base: 'block', md: 'none' }} onClick={onOpen} />
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={'5em'} w={'80%'}>
          <ModalBody>
            <VStack align={'stretch'}>
              <InputGroup>
                <InputLeftElement height={'2em'}>
                  <Icon as={MagnifyingGlassIcon} />
                </InputLeftElement>
                <Input
                  border={'1px solid lightgray'}
                  focusBorderColor={'lightgray'}
                  height={'2em'}
                  variant={'outline'}
                  placeholder={'Search a product here'}
                  onChange={(e) => {
                    setFilter(e.target.value)
                  }}
                  value={filter}
                  onKeyDown={handleKeyPress}
                />
              </InputGroup>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
