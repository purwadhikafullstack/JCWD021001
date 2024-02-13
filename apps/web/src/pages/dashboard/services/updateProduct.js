import axios from 'axios'

export const updateProduct = async (name, price, description, productCategoryId, id, toast) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.patch(
      `http://localhost:8000/api/product/${id}`,
      {
        name,
        price,
        description,
        productCategoryId,
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    toast({
      title: `${res?.data?.message}`,
      status: 'success',
      placement: 'bottom',
    })
    return res
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast({
      title: `${errorMessage}`,
      status: 'error',
    })
  }
}
