import { findWarehouseProvinceQuery, findWarehousesQuery, getShippingCostQuery } from "../queries/warehouseAddress.queries";

//GET
export const findWarehouseAddressService = async (provinceId, userLat, userLong) => {
    try{
        const toRadians = (degrees) => {
            return degrees * Math.PI / 180;
        }

        const haversineDistance = (coords1, coords2) => {
        const earthRadiusKm = 6371;

        const dLat = toRadians(coords2.latitude - coords1.latitude);
        const dLon = toRadians(coords2.longitude - coords1.longitude);

        const lat1 = toRadians(coords1.latitude);
        const lat2 = toRadians(coords2.latitude);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
        }

        const warehouseProvince = await findWarehouseProvinceQuery(provinceId)

        let nearestWarehouse = null;
        let shortestDistance = Infinity;

        console.log("ini warehouse",warehouseProvince);

        if (warehouseProvince){
        warehouseProvince.forEach(warehouse => {
            const warehouseLat = warehouse.WarehouseAddress.latitude
            const warehouseLong = warehouse.WarehouseAddress.longitude
            const distance = haversineDistance(
              { latitude: userLat, longitude: userLong },
              { latitude: warehouseLat, longitude: warehouseLong }
            );
        
            if (distance < shortestDistance) {
              shortestDistance = distance;
              nearestWarehouse = warehouse;
            }
          })
        } else {
            const warehouses = await findWarehousesQuery()
            warehouses.forEach(warehouse => {
                const warehouseLat = warehouse.WarehouseAddress.latitude
                const warehouseLong = warehouse.WarehouseAddress.longitude
                const distance = haversineDistance(
                    { latitude: userLat, longitude: userLong },
                    { latitude: warehouseLat, longitude: warehouseLong }
                  );
              
                  if (distance < shortestDistance) {
                    shortestDistance = distance;
                    nearestWarehouse = warehouse;
                  }
                })
        };

        return nearestWarehouse;

    } catch (err){
        throw err
    }
}

//RAJAONGKIR
export const getShippingCostService = async (origin, destination, weight, courier) => {
    try{
        const response = await getShippingCostQuery(origin, destination, weight, courier)
        console.log("ini response",response);
        return response

    } catch (err){
        throw err
    }
}
