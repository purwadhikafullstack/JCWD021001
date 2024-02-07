import {
  updateUsernameQuery,
  updateEmailQuery,
  updatePasswordQuery,
  findUsernameQuery,
  findEmailQuery,
  uploadAvatarFileQuery,
  findAdminQuery,
  findUserQuery,
  updateUserQuery,
  deleteUserQuery,
  createUserQuery,
  findUserListQuery,
} from '../queries/user.queries'

import { findUserAuthQuery } from '../queries/auth.queries'
import jwt, {Secret} from "jsonwebtoken";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import transporter from "../../utils/transporter";
import bcrypt from 'bcrypt'

export const updateUsernameService = async (id, username) => {
  try {
    const check = await findUsernameQuery(username)
    if (check) throw new Error('Username already exist')
    await updateUsernameQuery(id, username)
  } catch (err) {
    throw err
  }
}
export const updateEmailService = async (id, email) => {
  try {
    const check = await findEmailQuery(email)
    if (check) throw new Error('Email already exist')
    await updateEmailQuery(id, email)
  } catch (err) {
    throw err
  }
}
export const updatePasswordService = async (id, password) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    await updatePasswordQuery(id, hashPassword)
  } catch (err) {
    throw err
  }
}

export const uploadAvatarFileService = async (id, avatar) => {
  try {
    await uploadAvatarFileQuery(id, avatar)
  } catch (err) {
    throw err
  }
}

export const findAdminService = async (
  warehouseId,
  cityId,
  username,
  page,
  pageSize,
  sortField,
  sortOrder,
) => {
  try {
    const res = await findAdminQuery(
      warehouseId,
      cityId,
      username,
      page,
      pageSize,
      sortField,
      sortOrder,
    )
    return res
  } catch (err) {
    throw err
  }
}

export const findUserListService = async (
  cityId,
  isVerified,
  username,
  page,
  pageSize,
  sortField,
  sortOrder,
) => {
  try {
    const res = await findUserListQuery(
      cityId,
      isVerified,
      username,
      page,
      pageSize,
      sortField,
      sortOrder,
    )
    return res
  } catch (err) {
    throw err
  }
}

export const findUserService = async () => {
  try {
    const res = await findUserQuery()
    return res
  } catch (err) {
    throw err
  }
}

export const updateUserService = async (id, username, email, password, roleId) => {
  try {
    let hashPassword

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10)
      hashPassword = await bcrypt.hash(password, salt)
    }

    await updateUserQuery(id, username, email, hashPassword, roleId)
  } catch (err) {
    throw err
  }
}

export const deleteUserService = async (id) => {
  try {
    await deleteUserQuery(id)
  } catch (err) {
    throw err
  }
}

export const createUserService = async (email, username, roleId) => {
  try {
    // CHECK WHETHER OR NOT EMAIL AND USERNAME EXIST
    const check = await findUserAuthQuery({ email, username })
    if (check) throw new Error('Email or username already exist')

    const res = await createUserQuery(email, username, roleId)

    // GENERATE TOKEN FOR NEW USER TO VERIFY THEIR EMAILS
    const secretKey = process.env.JWT_SECRET_KEY
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not set in the environment')
    }

    const tokenVerification = jwt.sign({ email }, secretKey, {
      expiresIn: '1hr',
    })

    // TEMPLATE EMAIL
    const temp = await fs.readFileSync(
      path.join(__dirname, '../template', 'email-verification.html'),
      'utf-8',
    )

    // SEND EMAIL FOR EMAIL VERIFICATION
    const emailVerificationLink = `${process.env.FE_BASE_URL}/auth/email-verification?token=${tokenVerification}`
    const tempCompile = await handlebars.compile(temp)
    const tempResult = tempCompile({ email: email, link: emailVerificationLink })
    const gmailUser = process.env.GMAIL_USER
    if (typeof gmailUser !== 'string') {
      throw new Error('GMAIL_USER is not set in the environment')
    }

    if (typeof email !== 'string') {
      throw new Error('Recipient email is invalid')
    }

    await transporter.sendMail({
      from: gmailUser,
      to: email,
      subject: 'Email Confirmation',
      html: tempResult,
    })

    return res
  } catch (err) {
    throw err
  }
}
