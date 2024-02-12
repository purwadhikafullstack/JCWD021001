import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'
import { deleteSize } from '../../services/deleteSize'

export const DeleteSize = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Text
        w={'5em'}
        fontSize={'.75em'}
        fontWeight={'bold'}
        color={'redPure.600'}
        cursor={'pointer'}
        onClick={onOpen}
      >
        Delete
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'bold'}>Confirmation</ModalHeader>
          <ModalBody>Are you sure you want to delete?</ModalBody>
          <ModalFooter>
            <Text
              w={'5em'}
              fontSize={'.75em'}
              fontWeight={'bold'}
              color={'redPure.600'}
              cursor={'pointer'}
              onClick={async () => {
                await deleteSize(props?.id, props?.toast)
                props?.setTrigger(!props?.trigger)
                onClose()
              }}
            >
              Yes
            </Text>
            <Text
              w={'5em'}
              fontSize={'.75em'}
              fontWeight={'bold'}
              color={'redPure.600'}
              cursor={'pointer'}
              onClick={onClose}
            >
              No
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
