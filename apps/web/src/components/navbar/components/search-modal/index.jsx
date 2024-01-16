import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
  Flex,
  HStack,
  Grid,
} from '@chakra-ui/react'
import { ExclamationCircleIcon, MagnifyingGlassIcon, TagIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { getProductType } from '../../services/readProductType'
import { Link } from 'react-router-dom'
export const SearchModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)
  const [productType, setProductType] = useState([])
  const [filter, setFilter] = useState('')

  const renderedProductType = productType.map((el, index) => {
    return (
      <Link key={index}>
        <Grid
          p={'0 .5em'}
          templateColumns={'.2fr 1fr 1fr'}
          alignItems={'center'}
          cursor={'pointer'}
        >
          <Icon as={TagIcon}></Icon>
          <Text>{el?.type?.name}</Text>
          <Text color={'lightgray'}>{el?.group?.name?.toUpperCase()}</Text>
        </Grid>
      </Link>
    )
  })
  return (
    <Box>
      <Icon as={MagnifyingGlassIcon} display={{ base: 'block', md: 'none' }} onClick={onOpen} />
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={'5em'}>
          <ModalBody>
            <VStack align={'stretch'}>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={MagnifyingGlassIcon} />
                </InputLeftElement>
                <Input
                  variant={'outline'}
                  focusBorderColor={'lightgray'}
                  placeholder={'Search a product here'}
                  onChange={(e) => {
                    setTimeout(() => {
                      setFilter(e.target.value)
                    }, 2000)
                  }}
                />
              </InputGroup>
              <VStack align={'stretch'}>
                {filter && productType.length == 0 ? (
                  <HStack p={'0 .5em'} spacing={'1.2em'} color={'redPure.500'}>
                    <Icon as={ExclamationCircleIcon} />
                    <Text>Not Found</Text>
                  </HStack>
                ) : filter && productType.length !== 0 ? (
                  renderedProductType
                ) : null}
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
