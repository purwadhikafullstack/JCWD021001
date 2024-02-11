import * as Yup from 'yup'

export const warehouseSchema = Yup.object().shape({
  location: Yup.string().required('location is required'),
  cityId: Yup.string().required('city is required'),
  postalCode: Yup.string().required('postal code is required'),
  name: Yup.string().required('warehouse name is required'),
})