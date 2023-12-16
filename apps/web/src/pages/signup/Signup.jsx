import { AbsoluteCenter, Box, Button, Divider, Flex, FormControl, Icon, Image, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import model from '../../assets/images/signup-model.jpeg'
import { UserCircleIcon, EnvelopeIcon,LockClosedIcon,  } from '@heroicons/react/24/outline'
import { instagram } from "../../assets/Icons/Icons"
function Signup() {
  return (
    <>
        <Flex height={'1024px'} width={'100%'} boxShadow={'base'}>
            <Box width={'50%'} height={'1024px'} position={'relative'}>
                <Image borderTopRightRadius={'20'} borderBottomRightRadius={'20'} src={model} width={'730px'} height={'1024px'} objectFit={'cover'}/>
            </Box>
            <Flex justifyContent={'center'} alignItems={'center'} alignContent={'center'} width={'50%'}>
                <Box width={'534px'} height={'836px'}>
                <Text fontWeight={'800'} color={'brand.lightred'} textAlign={'center'} fontSize={'48px'} marginBottom={'48px'}>SIGN UP</Text>
                
                <FormControl>
                    <InputGroup marginBottom={'32px'}>
                    <Input
                        name="username"
                        placeholder="Username"
                        _placeholder={{color:"#707070"}}
                        height={'72px'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        paddingLeft={'72px'}
                        fontSize={'24px'}
                        borderRadius={'16px'}
                    />
                    <InputLeftElement top={'15px'} width={'72px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'72px'}>
                        <Icon as={UserCircleIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'brand.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                </FormControl>
                
                <FormControl>    
                    <InputGroup marginBottom={'32px'}>
                    <Input
                        name="email"
                        placeholder="Email"
                        _placeholder={{color:"#707070"}}
                        height={'72px'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        paddingLeft={'72px'}
                        fontSize={'24px'}
                        borderRadius={'16px'}
                    />
                    <InputLeftElement top={'15px'} width={'72px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'72px'}>
                        <Icon as={EnvelopeIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'brand.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <InputGroup marginBottom={'32px'}>
                    <Input
                        name="password"
                        placeholder="Password"
                        _placeholder={{color:"#707070"}}
                        height={'72px'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        paddingLeft={'72px'}
                        fontSize={'24px'}
                        borderRadius={'16px'}
                    />
                    <InputLeftElement top={'15px'} width={'72px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'72px'}>
                        <Icon as={LockClosedIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'brand.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                </FormControl>

                <FormControl>    
                    <InputGroup marginBottom={'32px'}>
                    <Input
                        name=""
                        placeholder="Confirm password"
                        _placeholder={{color:"#707070"}}
                        height={'72px'}
                        bg={'#EEEDED'}
                        color={'#707070'}
                        paddingLeft={'72px'}
                        fontSize={'24px'}
                        borderRadius={'16px'}
                    />
                    <InputLeftElement top={'15px'} width={'72px'}>
                        <Flex justifyContent={'center'} alignItems={'center'} height={'72px'}>
                        <Icon as={LockClosedIcon} boxSize={'24px'} margin={'auto'} position={'relative'} textColor={'brand.grey350'}/>
                        </Flex>
                    </InputLeftElement>
                    </InputGroup>
                </FormControl>

                <Button width={'534px'} height={'80px'} borderRadius={'16px'} fontSize={'24px'} fontWeight={'700'} color={'white'} bg={'brand.lightred'} _hover={{bg: '#f50f5a'}} _active={{opacity:'70%'}}>SIGN UP</Button>
                <Box position='relative' margin={'32px 0'}>
                    <Divider border={'1px solid #D9D9D9'} />
                    <AbsoluteCenter bg='white' px='4'>
                        or
                    </AbsoluteCenter>
                </Box>
                <Flex justifyContent={'center'}
                alignItems={'center'} 
                gap={'24px'}>
                    <Box width={'48px'} height={'48px'} bg={'brand.lightred'} padding={'8px'} borderRadius={'12px'}>
                        <Icon as={instagram} boxSize={'40px'} color={'white'}/>
                    </Box>
                    <Box width={'48px'} height={'48px'} bg={'brand.lightred'} padding={'8px'} borderRadius={'12px'}>
                        <Icon as={instagram} boxSize={'40px'} color={'white'}/>
                    </Box>
                    <Box width={'48px'} height={'48px'} bg={'brand.lightred'} padding={'8px'} borderRadius={'12px'}>
                        <Icon as={instagram} boxSize={'40px'} color={'white'}/>
                    </Box>
                    <Box width={'48px'} height={'48px'} bg={'brand.lightred'} padding={'8px'} borderRadius={'12px'}>
                        <Icon as={instagram} boxSize={'40px'} color={'white'}/>
                    </Box>
                </Flex>
                </Box>
            </Flex>
        </Flex>
    </>
  )
}

export default Signup