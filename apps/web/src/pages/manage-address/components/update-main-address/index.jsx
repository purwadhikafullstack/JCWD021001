
import { updateMainAddress } from "../../services/updateUserAddress";
import { Box} from "@chakra-ui/react";

function UpdateMainAddress ({id, userId, onUpdatedMainAddress}){
    const handleUpdateMainAddress = async () => {
        try {
            await updateMainAddress(id, userId);
            onUpdatedMainAddress()
        } catch (err) {
            console.error(err.message);
        }
    }; 
 return (
    <>
        <Box onClick={handleUpdateMainAddress} 
        fontSize={'14px'}
        fontWeight={'700'}>
            Set as Main Address
        </Box>
    </>
 )
}

export default UpdateMainAddress