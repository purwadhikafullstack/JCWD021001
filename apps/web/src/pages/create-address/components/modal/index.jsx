import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
// other imports remain the same

function ModalMapAddressEntry() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect hook to open the modal when the component mounts
  useEffect(() => {
    onOpen();
  }, [onOpen]); // Dependency array ensures this only runs once when the component mounts

  return (
    <>
      {/* Remove the button that manually opens the modal, as it's not needed */}
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt={'24px'}>
            <Text fontWeight={'700'} textAlign={'center'}>
                Select Your Address Using the Map or Automatically Fill with Your Current Location
            </Text>
          </ModalBody>
          <ModalFooter display={'flex'} justifyContent={'center'}>
            <Button bg={'brand.lightred'} 
            color={'white'} 
            onClick={onClose}
            _hover={{bg: '#f50f5a'}} 
            _active={{opacity:'70%'}}>
              I understand!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalMapAddressEntry;