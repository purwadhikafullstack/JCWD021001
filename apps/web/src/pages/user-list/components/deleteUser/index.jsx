import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { deleteAdminFunction } from "../../services/deleteAdmin";

function DeleteUser ({id, onDeletedUser}){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteAdmin = async () => {
        try{
            await deleteAdminFunction(id)
            onDeletedUser()
            onClose()
        }catch (err){
            console.log(err.message);
        }
    }
  return (
    <>
        <Button
        onClick={onOpen}
        variant={'outline'}
        border={'1px solid #CD0244'}
        color={'#CD0244'}
        fontSize={'12px'}
        fontWeight={'700'}
        padding={'4px 16px'}
        w={'72px'}
        _hover={'none'}
        _active={'none'}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
        <Flex flexDir={'column'} justify={'center'} align={'center'} margin={'24px 24px 8px'}>
        <ModalBody fontWeight={'700'}>
            Are you sure you want to delete this admin?
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
            onClick={handleDeleteAdmin}>
                Yes, I wanna delete it
            </Button>
        </ModalFooter>
        </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteUser