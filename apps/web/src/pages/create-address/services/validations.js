import * as Yup from 'yup'

export const addressSchema = Yup.object().shape({
    specificAddress: Yup.string()
    .required('address is required'),
    cityId: Yup.string()
    .required('city is required'),
    fullName: Yup.string()
    .required('full name is required')
    .matches(/^[A-Za-z\s\-']+$/, "full name can only include letters, spaces, hyphens, or apostrophes"),
    phoneNumber: Yup.string()
    .required('phone number is required')
    .matches(/^\+?\d{1,3}[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/, "phone number is not valid"),
    postalCode: Yup.string()
    .required('postal code is required')
    .matches(/^\d{5}$/, "postal code is not valid"),
})
