import { Text } from '@chakra-ui/react'

export const RenderedGender = (props) => {
  const renderedGenders = props?.genders?.map((el, index) => {
    return (
      <Text
        cursor={'pointer'}
        key={index}
        itemID={el.id}
        onClick={() => {
          props?.setGender(el?.name)
          props?.setGroup('')
          props?.setCategoryValue('')
        }}
      >
        {el?.name}
      </Text>
    )
  })
  return <>{renderedGenders}</>
}

export const RenderedGroup = (props) => {
  // Render Group
  const renderedGroup = props?.productCategories.map((productGroup, index) => {
    return (
      <Text
        cursor={'pointer'}
        key={index}
        itemID={productGroup.id}
        onClick={() => {
          props?.setGroup(productGroup?.name)
          props?.setCategoryValue('')
          props?.formik.setFieldValue('productCategoryId', '')
          props?.handleEditClickCategory(productGroup?.name)
        }}
      >
        {productGroup.name}
      </Text>
    )
  })
  return <>{renderedGroup}</>
}

export const RenderedCategory = (props) => {
  // Render Category
  const renderedCategory = props?.productCategories.map((productGroup) => {
    return productGroup.category.map((productCategory, index) => {
      return (
        <>
          {props?.editableCategory[productGroup?.name] && (
            <Text
              cursor={'pointer'}
              key={index}
              itemID={productCategory.id}
              onClick={() => {
                props?.setCategoryValue(productCategory.name)
                props?.setGroup(productGroup?.name)
                props?.formik.setFieldValue('productCategoryId', productCategory?.id)
              }}
            >
              {productCategory.name}
            </Text>
          )}
        </>
      )
    })
  })
  return <>{renderedCategory}</>
}
