import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'

const initialState = {
  user: {
    id: null,
    username: '',
    email: '',
    roleId: null,
    isVerified: null,
    avatar: '',
    warehouseId: null,
  },
  isLogin: false,
  isSuperAdmin: false,
}

export const AuthReducer = createSlice({
  name: 'AuthReducer',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, roleId, isVerified, avatar, warehouseId } = action.payload

      state.user = {
        id,
        username,
        email,
        roleId,
        isVerified,
        avatar,
        warehouseId,
      }
      state.isSuperAdmin = roleId === 1
    },
    loginSuccess: (state, action) => {
      state.isLogin = true
    },
    logoutSuccess: (state, action) => {
      state.isLogin = false
      localStorage.removeItem('token')
    },
    keepLoginSuccess: (state) => {
      state.isLogin = true
    },
  },
})

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}auth/login`, {
        email,
        password,
      })
      localStorage.setItem('token', res?.data?.data?.token)
      console.log(res.data?.data?.token)
      console.log(res.data?.data)
      dispatch(setUser(res?.data?.data?.user))
      dispatch(loginSuccess())
    } catch (err) {
      toast.error(err?.response?.data)
      throw err
    }
  }
}

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')

      if (token) {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}auth/keep-login`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        dispatch(setUser(res?.data?.data))
        dispatch(keepLoginSuccess())
      }
    } catch (err) {
      localStorage.removeItem('token')
      toast.error(err?.response?.data)
    }
  }
}

export const { loginSuccess, logoutSuccess, setUser, keepLoginSuccess } = AuthReducer.actions

export default AuthReducer.reducer
