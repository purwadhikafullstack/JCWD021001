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
    toast({
      title: `${err?.message}`,
      status: 'error',
    })
  }
}
