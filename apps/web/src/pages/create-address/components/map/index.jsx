import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



function Map ({ lat, lng }){

    if (lat == null || lng == null) {
        return <div>Loading map...</div>; // Or any other placeholder
    }
    
    return (
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[lat, lng]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    )
}

export default Map;