import * as Yup from 'yup'

export const signupScheme = Yup.object().shape({
  email: Yup.string().email('email is invalid').required('email is required'),
  username: Yup.string()
    .required('username is required')
    .matches(/^\S*$/, 'username cannot contain spaces'),
})
