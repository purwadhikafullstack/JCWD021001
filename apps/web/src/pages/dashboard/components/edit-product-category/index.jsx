import { Box, Text, VStack, useToast, HStack, FormControl } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { getGender, getProductCategory } from './services/getProductCategory'
import { SaveText } from './component/save-text'
import { DeleteText } from './component/delete-text'
import { SaveChildren } from './component/save-text-children'
import { DeleteChildren } from './component/delete-children'
import {
  CategoryNameInput,
  GroupNameInput,
  NewGroupInput,
  NewProductInput,
  NewSizeInput,
} from './component/input'
import {
  AddNewGroupButton,
  EditableButton,
  HandleAddSubmitButton,
  HandleAddSubmitSizeButton,
  HandleEditButton,
  HandleEditSizeButton,
} from './component/button'
import { GrandParentInput } from './component/grandparent-input'
import { SaveGrandParentText } from './component/save-grandparent-text'
import { DeleteSize } from './component/delete-size'

export const EditProductCategory = (props) => {
  const [trigger, setTrigger] = useState(false)

  const { epid } = useParams() //params

  const toast = useToast() //toast

  const [gender, setGender] = useState([]) //gender details

  const [productCategory, setProductCategory] = useState([]) //Product Category

  const [newChildren, setNewChildren] = useState(null)

  const [input, setInput] = useState([{}])

  const [fixInput, setFixInput] = useState('')

  const onFocusInput = (id, text) => {
    const test = {
      id,
      text,
    }
    setInput([test, ...input])
  }

  const handleInput = async (id, text) => {
    setInput(
      input.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            text,
          }
        } else {
          return el
        }
      }),
    )
    setFixInput(text)
  }
  const findById = (id) => {
    const foundObject = input.find((item) => item.id === id)
    return foundObject ? foundObject.text : null
  }

  useEffect(() => {
    getGender(epid, setGender)
    if (gender) {
      getProductCategory(setProductCategory, epid)
    }
  }, [trigger])

  const [editable, setEditable] = useState({})

  const handleEditClick = (id) => {
    setEditable((set) => ({
      ...set,
      [id]: !set[id],
    }))
  }

  // EDITABLE
  const [editableCategory, setEditableCategory] = useState(false)
  const handleEditClickCategory = () => {
    setEditableCategory(!editableCategory)
  }

  const prodCatData = productCategory?.map((productGroup, index) => {
    return {
      name: productGroup?.name,
      id: productGroup?.id,
      category: [
        productGroup?.category?.map((productCategory, index) => {
          return {
            name: productCategory?.name,
            id: productCategory?.id,
          }
        }),
      ],
    }
  })

  const flattenData = [].concat(...prodCatData)
  const data = [...flattenData]
  const initialValues = {
    [gender[0]?.id]: gender[0]?.name,
  }
  data.forEach((item) => {
    initialValues[`name_${item.id}`] = item.name
    if (item.category) {
      const flattenData = [].concat(...item.category)
      flattenData.forEach((el) => {
        initialValues[`childName_${el.id}`] = el.name
      })
    }
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
  })
  return (
    <Box bgColor={'white'} p={'1em'} w={'100%'} h={'100%'}>
      <VStack align={'stretch'}>
        <Text fontWeight={'bold'}>Edit Product Category</Text>
        <Text fontWeight={'bold'}>{gender[0]?.name}</Text>
        <form>
          <VStack align={'stretch'} spacing={'2em'}>
            {productCategory?.map((item) => (
              <Box key={item.id} boxShadow={'md'} p={'.5em'} borderRadius={'.5em'}>
                <GrandParentInput
                  id={gender[0]?.id}
                  formik={formik}
                  editableCategory={editableCategory}
                />
                {props?.isSuperAdmin && (
                  <>
                    <SaveGrandParentText
                      formik={formik}
                      toast={toast}
                      id={gender[0]?.id}
                      trigger={trigger}
                      setTrigger={setTrigger}
                    />
                  </>
                )}
                <Text fontWeight={'bold'} mb={'.5em'}>
                  Group
                </Text>
                <GroupNameInput id={item.id} formik={formik} editableCategory={editableCategory} />
                {props?.isSuperAdmin && (
                  <>
                    <SaveText
                      formik={formik}
                      toast={toast}
                      id={item.id}
                      trigger={trigger}
                      setTrigger={setTrigger}
                    />
                    <DeleteText
                      id={item?.id}
                      toast={toast}
                      trigger={trigger}
                      setTrigger={setTrigger}
                    />
                  </>
                )}
                <Text fontWeight={'bold'} mb={'.5em'}>
                  Category
                </Text>
                <VStack align={'stretch'}>
                  {item.category &&
                    item.category.map((child) => (
                      <div key={child.id}>
                        <CategoryNameInput
                          id={child?.id}
                          formik={formik}
                          editableCategory={editableCategory}
                        />
                        {props?.isSuperAdmin && (
                          <>
                            <SaveChildren
                              id={child?.id}
                              toast={toast}
                              formik={formik}
                              trigger={trigger}
                              setTrigger={setTrigger}
                            />
                            <DeleteChildren
                              id={child?.id}
                              itemId={item?.id}
                              toast={toast}
                              trigger={trigger}
                              setTrigger={setTrigger}
                            />
                          </>
                        )}
                      </div>
                    ))}
                </VStack>
                <Text fontWeight={'bold'} mb={'.5em'}>
                  Size
                </Text>
                {item &&
                  item?.size &&
                  [...new Set(item.size.map((size) => size.id))].map((uniqueSizeId, index) => {
                    const uniqueSize = item.size.find((size) => size.id === uniqueSizeId)

                    return (
                      <Box key={index}>
                        <Text fontWeight="bold" fontSize=".9">
                          {uniqueSize?.name}
                        </Text>
                        {props?.isSuperAdmin && (
                          <DeleteSize
                            id={uniqueSize?.id}
                            toast={toast}
                            trigger={trigger}
                            setTrigger={setTrigger}
                          />
                        )}
                      </Box>
                    )
                  })}

                {editable[item?.id] && props?.isSuperAdmin && (
                  <FormControl>
                    <NewProductInput
                      id={item?.id}
                      findById={findById}
                      onFocusInput={onFocusInput}
                      setInput={setInput}
                      handleInput={handleInput}
                    />
                  </FormControl>
                )}
                <HStack my={'.5em'}>
                  {props?.isSuperAdmin && (
                    <HandleEditButton
                      handleEditClick={handleEditClick}
                      editable={editable}
                      id={item?.id}
                    />
                  )}

                  {editable[item?.id] && props?.isSuperAdmin && (
                    <HandleAddSubmitButton
                      setFixInput={setFixInput}
                      id={item?.id}
                      toast={toast}
                      fixInput={fixInput}
                      trigger={trigger}
                      setTrigger={setTrigger}
                    />
                  )}
                </HStack>
                {editable[`size-${item?.id}`] && props?.isSuperAdmin && (
                  <FormControl>
                    <NewSizeInput
                      trigger={trigger}
                      setTrigger={setTrigger}
                      id={`size-${item?.id}`}
                      findById={findById}
                      onFocusInput={onFocusInput}
                      setInput={setInput}
                      handleInput={handleInput}
                    />
                  </FormControl>
                )}
                <HStack my={'.5em'}>
                  {props?.isSuperAdmin && (
                    <HandleEditSizeButton
                      handleEditClick={handleEditClick}
                      editable={editable}
                      id={`size-${item?.id}`}
                    />
                  )}
                  {editable[`size-${item?.id}`] && props?.isSuperAdmin && (
                    <HandleAddSubmitSizeButton
                      trigger={trigger}
                      setTrigger={setTrigger}
                      productCategoryId={item?.id}
                      setFixInput={setFixInput}
                      id={`size-${item?.id}`}
                      toast={toast}
                      fixInput={fixInput}
                    />
                  )}
                </HStack>
              </Box>
            ))}
          </VStack>
        </form>
        {props?.isSuperAdmin && (
          <>
            <Text fontWeight={'bold'} display={editable[gender[0]?.id] ? 'block' : 'none'}>
              New Group
            </Text>
            {editable[gender[0]?.id] && (
              <NewGroupInput
                genderId={gender[0]?.id}
                findById={findById}
                onFocusInput={onFocusInput}
                setInput={setInput}
                handleInput={handleInput}
                setNewChildren={setNewChildren}
              />
            )}
            <AddNewGroupButton
              trigger={trigger}
              setTrigger={setTrigger}
              handleEditClick={handleEditClick}
              editable={editable}
              genderId={gender[0]?.id}
              setFixInput={setFixInput}
              fixInput={fixInput}
              newChildren={newChildren}
              toast={toast}
            />
            <EditableButton
              handleEditClickCategory={handleEditClickCategory}
              editableCategory={editableCategory}
            />
          </>
        )}
      </VStack>
    </Box>
  )
}
