import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

export const SuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()  
  const handleCloseClick = () => {
    navigate('/')
    onClose()
    }
    return (
      <>
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={{base: 'xs', md: 'sm'}}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={'center'} color={'green'} fontSize={'32px'}>Success!</ModalHeader>
            <ModalBody>
            Your account is ready! <b>Verify your email address</b> to access our latest collection. Act fast, the verification link <b>expires in an hour.</b> Welcome aboard!
            </ModalBody>
  
            <ModalFooter>
              <Button bg='brand.lightred' color='white' _hover={{bg: '#f50f5a'}} mr={3} onClick={handleCloseClick}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  };


  export const ErrorModal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size={{base: 'xs', md: 'sm'}} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'} color={'red.500'} fontSize={'32px'}>Failed!</ModalHeader>
          <ModalBody textAlign={'center'} >
            Username or email has already existed. Use another username or email.
          </ModalBody>
          <ModalFooter>
              <Button bg='brand.lightred' color='white' _hover={{bg: '#f50f5a'}} mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }