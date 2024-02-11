import User from '../models/user.model'
import UserAddress from '../models/userAddress.model'
import City from '../models/city.model'
import Warehouse from '../models/warehouse.model'
import Role from '../models/role.model'

import { Op } from 'sequelize'

// FIND
export const findUsernameQuery = async (username) => {
  try {
    return await User.findOne({ where: { username } })
  } catch (err) {
    throw err
  }
}
export const findEmailQuery = async (email) => {
  try {
    return await User.findOne({ where: { email } })
  } catch (err) {
    throw err
  }
}

export const findAdminQuery = async (
  warehouseId,
  cityId,
  username,
  page,
  pageSize,
  sortField,
  sortOrder,
) => {
  try {
    const filter = {
      where: {
        roleId: {
          [Op.or]: [1, 2],
        },
      },
      include: [
        {
          model: UserAddress,
          include: [
            {
              model: City,
            },
          ],
        },
        {
          model: Warehouse,
        },
        {
          model: Role,
        },
      ],
      limit: parseInt(pageSize, 10) || 10,
      offset: (page - 1) * pageSize,
      order: [],
    }

    if (warehouseId) {
      filter.where.warehouseId = warehouseId
    }

    if (cityId) {
      filter.include[0].where = { cityId: cityId }
    }

    if (username) {
      filter.where.username = {
        [Op.like]: `%${username}%`,
      }
    }

    switch (sortField) {
      case 'username':
        filter.order.push(['username', sortOrder])
        break
      case 'email':
        filter.order.push(['email', sortOrder])
        break
      case 'warehouseName':
        filter.order.push([{ model: Warehouse }, 'name', sortOrder])
        break
      case 'cityName':
        filter.order.push([
          { model: UserAddress, as: 'UserAddresses' },
          { model: City, as: 'City' },
          'name',
          sortOrder,
        ])
        break
      case 'roleName':
        filter.order.push([{ model: Role }, 'name', sortOrder])
        break
    }

    const res = await User.findAll(filter)
    const totalRecords = await User.count({
      where: filter.where,
    })

    const totalPages = Math.ceil(totalRecords / parseInt(pageSize, 10))
    return { data: res, totalPages, totalRecords }
  } catch (err) {
    throw err
  }
}

export const findUserListQuery = async (
  cityId,
  isVerified,
  username,
  page,
  pageSize,
  sortField,
  sortOrder,
) => {
  try {
    const filter = {
      where: {
        roleId: 3,
      },
      include: [
        {
          model: UserAddress,
          include: [
            {
              model: City,
            },
          ],
        },
      ],
      limit: parseInt(pageSize, 10) || 10,
      offset: (page - 1) * pageSize,
      order: [],
    }

    if (cityId) {
      filter.include[0].where = { cityId: cityId }
    }

    if (isVerified !== undefined) {
      if (isVerified === 'true') {
        filter.where.isVerified = true
      } else if (isVerified === 'false') {
        filter.where.isVerified = {
          [Op.or]: [false, null],
        }
      }
    } else {
    }

    if (username) {
      filter.where.username = {
        [Op.like]: `%${username}%`,
      }
    }

    switch (sortField) {
      case 'username':
        filter.order.push(['username', sortOrder])
        break
      case 'email':
        filter.order.push(['email', sortOrder])
        break
      case 'isVerified':
        filter.order.push(['isVerified', sortOrder])
        break
      case 'cityName':
        filter.order.push([
          { model: UserAddress, as: 'UserAddresses' },
          { model: City, as: 'City' },
          'name',
          sortOrder,
        ])
        break
    }

    const res = await User.findAll(filter)
    const totalRecords = await User.count({
      where: filter.where,
    })

    const totalPages = Math.ceil(totalRecords / parseInt(pageSize, 10))
    return { data: res, totalPages, totalRecords }
  } catch (err) {
    throw err
  }
}

export const findUserQuery = async () => {
  try {
    const res = await User.findAll({
      where: { roleId: 3 },
    })
    return res
  } catch (err) {
    throw err
  }
}


//UPDDATE
export const updateUserQuery = async (id, username, email, password, roleId) => {
  try {
    await User.update({ username, email, password, roleId }, { where: { id: id } })
  } catch (err) {
    throw err
  }
}

export const updateUsernameQuery = async (id, username) => {
  try {
    await User.update({ username }, { where: { id } });
    const updatedUser = await User.findOne({ where: { id } });
    return updatedUser; 
  } catch (err) {
    throw err;
  }
};

export const updateEmailQuery = async (id, email) => {
  try {
    await User.update({ email }, { where: { id } });
    const updatedUser = await User.findOne({ where: { id } });
    return updatedUser; 
  } catch (err) {
    throw err;
  }
};

export const updatePasswordQuery = async (id, password) => {
  try {
    await User.update({ password }, { where: { id } });
    const updatedUser = await User.findOne({ where: { id } });
    return updatedUser; 
  } catch (err) {
    throw err;
  }
};

export const uploadAvatarFileQuery = async (id, avatar) => {
  try {
    await User.update({ avatar }, { where: { id } });
    const updatedUser = await User.findOne({ where: { id } });
    return updatedUser; 
  } catch (err) {
    throw err;
  }
};

//DESTROY
export const deleteUserQuery = async (id) => {
  try {
    await User.destroy({
      where: {
        id: id,
      },
    })
  } catch (err) {
    throw err
  }
}

//POST
export const createUserQuery = async (email, username, roleId) => {
  const t = await User.sequelize.transaction()
  try {
    const res = await User.create(
      {
        email,
        username,
        roleId,
        isVerified: false,
      },
      { transaction: t },
    )
    await t.commit()
    return res
  } catch (err) {
    await t.rollback()
    throw err
  }
}
