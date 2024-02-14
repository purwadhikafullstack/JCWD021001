import { Avatar, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  UserCircleIcon,
  HomeModernIcon,
  HeartIcon,
  ArrowRightOnRectangleIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { logoutSuccess } from '../../../../redux/reducer/authReducer'

function AvatarNavbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.AuthReducer.user)
  const isAdmin = user.roleId
  return (
    <>
      <Menu autoSelect={false}>
        <MenuButton fontWeight={'700'} color={'brand.lightred'}>
          {user?.avatar ? (
            <Avatar
              name={user?.username}
              src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/avatar/${user?.avatar}`}
              w={'48px'}
              h={'48px'}
            />
          ) : (
            <Avatar
              name={user?.username}
              bg="rgba(40, 96, 67, 1)"
              src={'https://bit.ly/broken-link'}
              w={'48px'}
              h={'48px'}
              color={'white'}
            />
          )}
        </MenuButton>
        <MenuList zIndex={'99'} mt={'1.5em'}>
          {(isAdmin === 1 || isAdmin === 2) && (
            <MenuItem
              as="a"
              href={isAdmin === 1 ? '/dashboard/admin-list' : '/dashboard/product-list?pa=1'}
              _hover={{ bg: 'none', color: '#CD0244' }}
              _active={{ bg: 'none', color: '#CD0244' }}
              gap={'12px'}
            >
              <Icon as={BuildingLibraryIcon} boxSize={'24px'} />
              <Text fontWeight={'700'}>Dashboard</Text>
            </MenuItem>
          )}
          <MenuItem
            as="a"
            href="/profile"
            _hover={{ bg: 'none', color: '#CD0244' }}
            _active={{ bg: 'none', color: '#CD0244' }}
            gap={'12px'}
          >
            <Icon as={UserCircleIcon} boxSize={'24px'} />
            <Text fontWeight={'700'}>Account Setting</Text>
          </MenuItem>
          <MenuItem
            as="a"
            href="/manage-address"
            _hover={{ bg: 'none', color: '#CD0244' }}
            _active={{ bg: 'none', color: '#CD0244' }}
            gap={'12px'}
          >
            <Icon as={HomeModernIcon} boxSize={'24px'} />
            <Text fontWeight={'700'}>Manage Address</Text>
          </MenuItem>
          <MenuItem
            _hover={{ bg: 'none', color: '#CD0244' }}
            _active={{ bg: 'none', color: '#CD0244' }}
            gap={'12px'}
          >
            <Icon as={HeartIcon} boxSize={'24px'} />
            <Text fontWeight={'700'}>WishList</Text>
          </MenuItem>
          <MenuItem
            _hover={{ bg: 'none', color: '#CD0244' }}
            _active={{ bg: 'none', color: '#CD0244' }}
            gap={'12px'}
            onClick={() => {
              dispatch(logoutSuccess()), navigate('/')
            }}
          >
            <Icon as={ArrowRightOnRectangleIcon} boxSize={'24px'} />
            <Text fontWeight={'700'}>Sign Out</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default AvatarNavbar
