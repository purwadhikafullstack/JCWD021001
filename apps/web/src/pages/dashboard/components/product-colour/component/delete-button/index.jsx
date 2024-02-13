import {
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'
import { deleteProductCategory } from '../../../edit-product-category/services/deleteProductCategory'
import { deleteColour } from '../../services/deleteColour'

export const DeleteButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        _hover={{
          bgColor: 'transparent',
        }}
        fontSize={'.8em'}
        h={'2.5em'}
        w={'5em'}
        border={'1px solid #CD0244'}
        bgColor={'transparent'}
        color={'redPure.600'}
        onClick={onOpen}
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'bold'}>Confirmation</ModalHeader>
          <ModalBody>Are you sure you want to delete?</ModalBody>
          <ModalFooter>
            <Button
              _hover={{
                bgColor: 'redPure.600',
              }}
              fontSize={'.8em'}
              h={'2.5em'}
              w={'5em'}
              bgColor={'redPure.600'}
              color={'white'}
              mr={3}
              onClick={async () => {
                await deleteColour(props?.id, props?.toast)
                onClose()
              }}
            >
              Yes
            </Button>
            <Button
              _hover={{
                bgColor: 'transparent',
              }}
              fontSize={'.8em'}
              h={'2.5em'}
              w={'5em'}
              border={'1px solid #CD0244'}
              bgColor={'transparent'}
              color={'redPure.600'}
              onClick={onClose}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
