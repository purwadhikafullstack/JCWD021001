import { Box, Text, VStack, useToast, HStack } from '@chakra-ui/react'
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
} from './component/input'
import {
  AddNewGroupButton,
  EditableButton,
  HandleAddSubmitButton,
  HandleEditButton,
} from './component/button'

export const EditProductCategory = (props) => {
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
    getProductCategory(setProductCategory, epid)
  }, [])

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
  const initialValues = {}
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
                <Text fontWeight={'bold'} mb={'.5em'}>
                  Group
                </Text>
                <GroupNameInput id={item.id} formik={formik} editableCategory={editableCategory} />
                {props?.isSuperAdmin && (
                  <>
                    <SaveText formik={formik} toast={toast} id={item.id} />
                    <DeleteText id={item?.id} toast={toast} />
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
                            <SaveChildren id={child?.id} toast={toast} formik={formik} />
                            <DeleteChildren id={child?.id} itemId={item?.id} toast={toast} />
                          </>
                        )}
                      </div>
                    ))}
                </VStack>
                {console.log('editable-item-id', editable[item?.id])}
                {editable[item?.id] && props?.isSuperAdmin && (
                  <NewProductInput
                    id={item?.id}
                    findById={findById}
                    onFocusInput={onFocusInput}
                    setInput={setInput}
                    handleInput={handleInput}
                  />
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
