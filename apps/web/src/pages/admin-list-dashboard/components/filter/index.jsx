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
import { getCity, getWarehouse } from '../../services/getAdmin'
import { useEffect, useState } from 'react'
import { CheckIcon } from '@chakra-ui/icons'

function FilterAdmin({ setCityId, setWarehouseId }) {
  const [cityResult, setCityResult] = useState([])
  const [cityName, setCityName] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [warehouseName, setWarehouseName] = useState('')
  const [warehouseResult, setWarehouseResult] = useState([])
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchCity = async () => {
    if (cityName !== '') {
      const city = await getCity(cityName)
      setCityResult(city)
    } else {
      setCityResult([])
    }
  }
  useEffect(() => {
    fetchCity()
  }, [cityName])
  const fetchWarehouse = async () => {
    if (warehouseName !== '') {
      const warehouse = await getWarehouse(warehouseName)
      setWarehouseResult(warehouse)
    } else {
      setWarehouseResult([])
    }
  }
  useEffect(() => {
    fetchWarehouse()
  }, [warehouseName])

  const handleSubmit = () => {
    setCityId(selectedCity)
    setWarehouseId(selectedWarehouse)
    onClose()
  }


  const handleClear = () => {
    setSelectedCity('')
    setCityId('')
    setSelectedWarehouse('')
    setWarehouseId('')
    setCityName('')
    setWarehouseName('')
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
        _hover={''}
        onClick={onOpen}
        _active={{bg: '#FFF1F5', border: '1px solid #CD0244', color:'#CD0244'}}
      >
        <Flex w={'100%'} justifyContent={'space-between'}>
          <Text fontSize={'12px'} fontWeight={'600'}>
            Filter by
          </Text>
          <Icon as={AdjustmentsHorizontalIcon} boxSize={{base: '16px', md:'18px'}} />
        </Flex>
      </MenuButton>
      <MenuList width={'300px'}>
        <Box px={4} py={2}>
          <Text fontSize={'14px'} fontWeight={'700'}>
            City
          </Text>
          <Input
            placeholder="Type to search..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            mt={'10px'}
            fontSize={'14px'}
            size={'sm'}
          />
          {cityResult.length > 0 && (
            <RadioGroup value={selectedCity} onChange={setSelectedCity}>
              {cityResult.map((city) => (
                <Flex
                  key={city.id}
                  bg={selectedCity === city.id ? '#FFF2F7' : 'white'}
                  _hover={{ bg: '#FFF2F7' }}
                  padding={'4px'}
                  onClick={() => setSelectedCity(city.id)}
                >
                  <Radio value={city.id} opacity={'0'}>
                    <Flex align={'center'} gap={'10px'}>
                      <Text fontSize={'14px'}>{city.name}</Text>
                      <CheckIcon
                        display={selectedCity === city.id ? 'block' : 'none'}
                        color={'brand.lightred'}
                      />
                    </Flex>
                  </Radio>
                </Flex>
              ))}
            </RadioGroup>
          )}
        </Box>
        <Box px={4} py={2}>
          <Text fontSize={'14px'} fontWeight={'700'}>
            Warehouse
          </Text>
          <Input
            placeholder="Type to search..."
            value={warehouseName}
            onChange={(e) => setWarehouseName(e.target.value)}
            mt={'10px'}
            size={'sm'}
          />
          {warehouseResult.length > 0 && (
            <RadioGroup value={selectedWarehouse} onChange={setSelectedWarehouse}>
              {warehouseResult.map((warehouse) => (
                <Flex
                  key={warehouse.id}
                  bg={selectedWarehouse === warehouse.id ? '#FFF2F7' : 'white'}
                  _hover={{ bg: '#FFF2F7' }}
                  padding={'4px'}
                  onClick={() => setSelectedWarehouse(warehouse.id)}
                >
                  <Radio value={warehouse.id} opacity={'0'}>
                    <Flex align={'center'} gap={'10px'}>
                      <Text fontSize={'14px'}>{warehouse.name}</Text>
                      <CheckIcon
                        display={selectedWarehouse === warehouse.id ? 'block' : 'none'}
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
        _hover={{bg: ''}}
        px={4} py={2}>
          <Button
            type="sumbit"
            w={'72px'}
            padding={'12px 16px'}
            variant={'outline'}
            border={'1px solid #CD0244'}
            color={'#CD0244'}
            _hover={''}
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

export default FilterAdmin
