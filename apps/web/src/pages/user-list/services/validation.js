import * as Yup from 'yup'

export const userSchema = Yup.object().shape({
  email: Yup.string().email('email is invalid').required('email is required'),
  username: Yup.string()
    .required('username is required')
    .matches(/^\S*$/, 'username cannot contain spaces'),
    roleId: Yup.string()
    .required('role is required')
})

export const editUserSchema = Yup.object().shape({
    email: Yup.string().email('email is invalid'),
    username: Yup.string()
      .matches(/^\S*$/, 'username cannot contain spaces'),
  })
  