import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { getProvince } from '../../services/getWarehouseList'
import { useEffect, useState } from 'react'
import { CheckIcon } from '@chakra-ui/icons'

function FilterUser({ setProvinceId }) {
  const [provinceResult, setProvinceResult] = useState([])
  const [provinceName, setProvinceName] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchCity = async () => {
    if (provinceName !== '') {
      const province = await getProvince(provinceName)
      setProvinceResult(province)
    } else {
      setProvinceResult([])
    }
  }
  useEffect(() => {
    fetchCity()
  }, [provinceName])
  
  const handleSubmit = () => {
    setProvinceId(selectedProvince)
    onClose()
  }


  const handleClear = () => {
    setSelectedProvince('')
    setProvinceId('')
    setProvinceName('')
    onClose()
  }


  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        as={Button}
        h={{base: '36px', md:'48px'}}
        w={{base: '138px', md: '171px'}}
        padding={'12px 12px 12px 16px'}
        bg={'white'}
        _hover={'none'}
        onClick={onOpen}
        _active={{bg: '#FFF1F5', border: '1px solid #CD0244', color:'#CD0244'}}
      >
        <Flex w={'100%'} justifyContent={'space-between'}>
          <Text fontSize={'12px'} fontWeight={'600'}>
            Filter by
          </Text>
          <Icon as={AdjustmentsHorizontalIcon} boxSize={'18px'} />
        </Flex>
      </MenuButton>
      <MenuList width={'300px'}>
        <Box px={4} py={2}>
          <Text fontSize={'14px'} fontWeight={'700'}>
            Province
          </Text>
          <Input
            placeholder="Type to search..."
            value={provinceName}
            onChange={(e) => setProvinceName(e.target.value)}
            mt={'10px'}
            fontSize={'14px'}
            size={'sm'}
          />
          {provinceResult.length > 0 && (
            <RadioGroup value={selectedProvince} onChange={setSelectedProvince}>
              {provinceResult.map((province) => (
                <Flex
                  key={province.id}
                  bg={selectedProvince === province.id ? '#FFF2F7' : 'white'}
                  _hover={{ bg: '#FFF2F7' }}
                  padding={'4px'}
                  onClick={() => setSelectedProvince(province.id)}
                >
                  <Radio value={province.id} opacity={'0'}>
                    <Flex align={'center'} gap={'10px'}>
                      <Text fontSize={'14px'}>{province.name}</Text>
                      <CheckIcon
                        display={selectedProvince === province.id ? 'block' : 'none'}
                        color={'brand.lightred'}
                      />
                    </Flex>
                  </Radio>
                </Flex>
              ))}
            </RadioGroup>
          )}
        </Box>
        <Flex gap={'10px'}
        justifyContent={'flex-end'}
        _hover={{bg: 'none'}}
        px={4} py={2}>
          <Button
            type="sumbit"
            w={'72px'}
            padding={'12px 16px'}
            variant={'outline'}
            border={'1px solid #CD0244'}
            color={'#CD0244'}
            _hover={'none'}
            _active={{ opacity: '70%' }}
            onClick={() => handleClear()}
            size={'sm'}
          >
            Clear
          </Button>

          <Button
            type="sumbit"
            w={'72px'}
            padding={'12px 16px'}
            bgColor={'brand.lightred'}
            color={'white'}
            _hover={{ bg: '#f50f5a' }}
            _active={{ opacity: '70%' }}
            onClick={() => handleSubmit()}
            size={'sm'}
          >
            Save
          </Button>
        </Flex>
      </MenuList>
    </Menu>
  )
}

export default FilterUser
