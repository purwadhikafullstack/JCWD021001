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
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={{base: 'xs', md: 'md'}}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={'center'} color={'green'} fontSize={'32px'}>Success!</ModalHeader>
            <ModalBody>
            Request to email verification has been sent. Open your email to verify and reset your password.
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
      <Modal isOpen={isOpen} onClose={onClose} size={'sm'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'} color={'red.500'} fontSize={'32px'}>Failed!</ModalHeader>
          <ModalBody textAlign={'center'} >
            Email is not registered.
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