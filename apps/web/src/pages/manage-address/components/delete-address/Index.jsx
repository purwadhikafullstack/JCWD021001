import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { deleteUserAddress } from "../../services/deleteUserAddress";

function DeleteUserAddress ({id, onDeletedAddress}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteAddress = async () => {
        try{
            await deleteUserAddress(id)
            onDeletedAddress()
            onClose()
        }catch (err){
            console.log(err.message);
        }
    }
  return (
    <>
        <Box onClick={onOpen}
        fontSize={'14px'}
        fontWeight={'700'}>
            Delete Address
        </Box>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
        <Flex flexDir={'column'} justify={'center'} align={'center'} margin={'24px 24px 8px'}>
        <ModalBody fontWeight={'700'}>
            Are you sure you want to delete this address?
        </ModalBody>
        <ModalFooter display={'flex'} flexDir={'column'} gap={'10px'}>
            <Button bg={'brand.lightred'}
            color={'white'}
            _hover={{bg: '#f50f5a'}} 
            _active={{opacity:'70%'}} 
            onClick={onClose} 
            fontSize={'14px'}>
              No, nevermind!
            </Button>
            <Button variant='outline' 
            fontSize={'14px'}
            borderColor={'brand.lightred'}
            color={'brand.lightred'}
            _hover={{bg: 'white', borderColor:'#f50f5a'}} 
            _active={{opacity:'70%'}}
            onClick={handleDeleteAddress}>
                Yes, I wanna delete it
            </Button>
        </ModalFooter>
        </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteUserAddress