import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
// other imports remain the same

function ModalMapAddressEntry() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, [onOpen]); 

  return (
    <>
      
      <Modal isOpen={isOpen} onClose={onClose} size={{base: 'xs', md: 'md'}}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt={'24px'}>
            <Text  fontSize={{base: '14px', md: '16px'}} textAlign={'center'}>
                Select your address using the Map or automatically fill with Your Current Location
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