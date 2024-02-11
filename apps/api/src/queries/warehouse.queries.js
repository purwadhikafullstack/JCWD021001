import { Op } from 'sequelize'
import Warehouse from '../models/warehouse.model'
import WarehouseAddress from '../models/warehouseAddress.model'
import City from '../models/city.model'
import Province from '../models/province.model'
import { DB } from '../db'
import User from '../models/user.model'

export const findWarehouseQuery = async (name) => {
  try {
    const search = {
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    }
    const res = await Warehouse.findAll(search)
    return res
  } catch (err) {
    throw err
  }
}

export const findWarehouseListQuery = async (
  name,
  provinceId,
  page,
  pageSize,
  sortField,
  sortOrder,
) => {
  try {
    let warehouseIds = []
    if (provinceId) {
      const rawQuery = `
          SELECT w.id FROM Warehouses w
          INNER JOIN WarehouseAddresses wa ON wa.id = w.warehouseAddressId
          INNER JOIN Cities c ON c.id = wa.cityId
          WHERE c.provinceId = :provinceId
        `
      const results = await DB.sequelize.query(rawQuery, {
        replacements: { provinceId },
        type: DB.sequelize.QueryTypes.SELECT,
      })
      warehouseIds = results.map((result) => result.id)
    }

    const filter = {
      include: [
        {
          model: WarehouseAddress,
          include: [
            {
              model: City,
              include: [{ model: Province }],
            },
          ],
        },
      ],
      limit: parseInt(pageSize, 10) || 10,
      offset: (page - 1) * pageSize,
      order: [],
      where: {},
    }

    if (warehouseIds.length > 0) {
      filter.where.id = warehouseIds.length === 1 ? warehouseIds[0] : { [Op.in]: warehouseIds }
    }

    // SEARCH BY NAME
    if (name) {
      filter.where.name = { [Op.like]: `%${name}%` }
    }

    // SORT
    switch (sortField) {
      case 'name':
        filter.order.push(['name', sortOrder])
        break
      case 'cityName':
        filter.order.push(['WarehouseAddress', 'City', 'name', sortOrder])
        break
    }

    const res = await Warehouse.findAll(filter)
    const totalRecords = await Warehouse.count({
      where: filter.where,
    })

    const totalPages = Math.ceil(totalRecords / parseInt(pageSize, 10))
    return { data: res, totalPages, totalRecords }
  } catch (err) {
    throw err
  }
}

export const findWarehouseAdminQuery = async (warehouseId) => {
  try {
    const res = await User.findAll({
      where: { warehouseId: warehouseId },
    })
    return res
  } catch (err) {
    throw err
  }
}

export const findUnassignedAdminQuery = async () => {
  try {
    const res = await User.findAll({
      where: {
        warehouseId: null,
        roleId: 2,
      },
    })
    return res
  } catch (err) {
    throw err
  }
}

//PATCH

export const editWarehouseQuery = async (id, location, cityId, postalCode, latitude, longitude, name) => {
  try {
    await Warehouse.update({ id, location, cityId, postalCode, latitude, longitude, name }, { where: { id: id } })
  } catch (err) {
    throw err
  }
}

export const assignAdminWarehouseQuery = async (adminIds, warehouseId) => {
  try {
    console.log('admin ID', adminIds, "warehouse Id querry", warehouseId);
    await User.update(
      { warehouseId: warehouseId },
      {
        where: {
          id: {
            [Op.in]: adminIds, 
          },
        },
      },
    );
  } catch (err) {
    throw err;
  }
};


//DELETE
export const deleteWarehouseQuery = async (id) => {
  try {
    await Warehouse.destroy({
      where: {
        id: id,
      },
    })
  } catch (err) {
    throw err
  }
}

//POST
export const createWarehouseQuery = async (warehouseAddressId, name) => {
  try {
    const warehouse = await Warehouse.create({
      warehouseAddressId,
      name,
    })
    return warehouse
  } catch (err) {
    throw err
  }
}

export const createWarehouseAddressQuery = async (
  location,
  cityId,
  postalCode,
  latitude,
  longitude,
) => {
  try {
    const warehouseAddress = await WarehouseAddress.create({
      location,
      cityId,
      postalCode,
      latitude,
      longitude,
    })
    return warehouseAddress
  } catch (err) {
    throw err
  }
}
