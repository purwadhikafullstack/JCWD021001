import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'

export const ApproveButton = (props) => {
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
        visibility={
          props?.filterValue == 'app' && props?.mutation?.isAccepted === null ? 'visible' : 'hidden'
        }
      >
        Approve
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'bold'}>Approve</ModalHeader>
          <ModalBody>Are you sure you want to accept?</ModalBody>
          <ModalFooter>
            <Button
              mr={'3'}
              visibility={
                props?.filterValue == 'app' && props?.mutation?.isAccepted === null
                  ? 'visible'
                  : 'hidden'
              }
              _hover={{
                bgColor: 'transparent',
              }}
              fontSize={'.8em'}
              h={'2.5em'}
              w={'5em'}
              border={'1px solid #CD0244'}
              bgColor={'transparent'}
              color={'redPure.600'}
              onClick={async () => {
                if (props?.isJuragan) {
                  await props?.handleApprove(props?.mutation?.id, 1)
                  await props?.setTrigger(!props?.trigger)
                  onClose()
                }
              }}
            >
              {props?.isJuragan ? 'Approve' : ''}
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
