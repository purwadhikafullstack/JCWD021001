import {
  assignAdminWarehouseQuery,
  createWarehouseAddressQuery,
  createWarehouseQuery,
  deleteWarehouseQuery,
  editWarehouseQuery,
  findUnassignedAdminQuery,
  findWarehouseAdminQuery,
  findWarehouseListQuery,
  findWarehouseQuery,
} from '../queries/warehouse.queries'

export const findWarehouseService = async (name) => {
  try {
    const res = await findWarehouseQuery(name)
    return res
  } catch (err) {
    throw err
  }
}

export const findWarehouseListService = async (
  name,
  provinceId,
  page,
  pageSize,
  sortField,
  sortOrder,
) => {
  try {
    const res = await findWarehouseListQuery(name, provinceId, page, pageSize, sortField, sortOrder)
    return res
  } catch (err) {
    throw err
  }
}

export const findWarehouseAdminService = async (warehouseId) => {
  try {
    const res = await findWarehouseAdminQuery(warehouseId)
    return res
  } catch (err) {
    throw err
  }
}

export const findUnassignedAdminService = async () => {
  try {
    const res = await findUnassignedAdminQuery()
    return res
  } catch (err) {
    throw err
  }
}

export const assignAdminWarehouseService = async (adminIds, warehouseId) => {
  try {
    console.log("admin id", adminIds, "warehouse id service", warehouseId);
      await assignAdminWarehouseQuery(adminIds, warehouseId);
  } catch (err) {
    throw err;
  }
};


export const editWarehouseService = async (id, name) => {
  try {
    await editWarehouseQuery(id, name)
  } catch (err) {
    throw err
  }
}

export const deleteWarehouseService = async (id) => {
  try {
    await deleteWarehouseQuery(id)
  } catch (err) {
    throw err
  }
}

export const createWarehouseService = async (
  location,
  cityId,
  postalCode,
  latitude,
  longitude,
  name,
) => {
  try {
    const warehouseAddress = await createWarehouseAddressQuery(
      location,
      cityId,
      postalCode,
      latitude,
      longitude,
    )
    const warehouse = await createWarehouseQuery(warehouseAddress.id, name)
    return { warehouse, warehouseAddress }
  } catch (err) {
    throw err
  }
}
