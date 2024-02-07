import {
  updateUsernameService,
  updateEmailService,
  updatePasswordService,
  uploadAvatarFileService,
  findAdminService,
  findUserService,
  updateUserService,
  deleteUserService,
  createUserService,
  findUserListService
} from '../services/user.services'

export const updateUsernameController = async (req, res) => {
  try {
    const { id } = req.params
    const { username } = req.body
    await updateUsernameService(id, username)
    return res.status(200).json({
      message: 'Success',
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
export const updateEmailController = async (req, res) => {
  try {
    const { id } = req.params
    const { email } = req.body
    await updateEmailService(id, email)
    return res.status(200).json({
      message: 'Success',
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
export const updatePasswordController = async (req, res) => {
  try {
    const { id } = req.params
    const { password } = req.body
    await updatePasswordService(id, password)
    return res.status(200).json({
      message: 'Success',
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const uploadAvatarFileController = async (req, res) => {
  try {
    const { id } = req.params
    await uploadAvatarFileService(id, req.file?.filename)
    return res.status(200).json({
      message: 'success',
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const findAdminController = async (req, res) => {
  try {
    const {warehouseId,
      cityId,
      username,
      page,
      pageSize,
      sortField,
      sortOrder} = req.query
    const response = await findAdminService(warehouseId,
      cityId,
      username,
      page,
      pageSize,
      sortField,
      sortOrder)
    return res.status(200).json({
      message: 'success',
      data: response,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const findUserListController = async (req, res) => {
  try {
    const {
      cityId,
      isVerified,
      username,
      page,
      pageSize,
      sortField,
      sortOrder} = req.query
    const response = await findUserListService(
      cityId,
      isVerified,
      username,
      page,
      pageSize,
      sortField,
      sortOrder)
    return res.status(200).json({
      message: 'success',
      data: response,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const findUserController = async (req, res) => {
  try {
    const response = await findUserService()
    return res.status(200).json({
      message: 'success',
      data: response,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params
    const { username, email, password, roleId } = req.body
    await updateUserService(id, username, email, password, roleId)
    return res.status(200).json({
      message: 'success',
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const deleteUserController = async (req, res) => {
    try {
        const {id} = req.params
        await deleteUserService(id)
        return res.status(200).json({
            message: 'success',
          })
    } catch (err){
        return res.status(500).json({
            message: err.message
        })
    }
}

export const createUserController = async (req, res) => {
  try{
    const { email, username, roleId } = req.body

    const result = await createUserService(email, username, roleId)

    return res.status(200).json({
      message: 'Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
