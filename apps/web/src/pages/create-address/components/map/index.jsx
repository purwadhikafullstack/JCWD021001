import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import { findOpenCageAndCity } from '../../services/readUserAddress';
import 'leaflet/dist/leaflet.css';

function ClickableMap({ initialPosition, setSelectedAddress, setFormCurrentLocation, marker, setMarker, mapRef, setLat, setLng }) {
  const [markerPosition, setMarkerPosition] = useState(initialPosition);


  useMapEvent('click', (e) => {
      setMarkerPosition(e.latlng);
  });

  useEffect(() => {
    if (marker) {
      setMarkerPosition(initialPosition);
      setMarker(false);
      mapRef.current.flyTo(initialPosition, 13)
    }
  }, [marker, setMarker, initialPosition, mapRef]);

useEffect(() => {
  if (markerPosition) {
    const fetchData = async () => {
      try {
        const response = await findOpenCageAndCity(markerPosition.lat, markerPosition.lng);
        setSelectedAddress(response); 
        setLat(markerPosition.lat);
        setLng(markerPosition.lng);
        if (markerPosition !== initialPosition){
          setFormCurrentLocation(true);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchData();
  }
}, [markerPosition, setSelectedAddress, setFormCurrentLocation]);


  return (
      <Marker position={markerPosition}>
          <Popup>Kamu sedang. <br /> di sini nih!</Popup>
      </Marker>
  );
}

function Map({ lat, lng , setSelectedAddress, setFormCurrentLocation, marker, setMarker, setLat, setLng}) {
  const mapRef = useRef(null);

  if (lat == null || lng == null) {
      return <div>Loading map...</div>; 
  }

  const initialPosition = {lat, lng};

  return (
      <MapContainer center={initialPosition} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }} ref={mapRef}>
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickableMap 
          initialPosition={initialPosition} 
          setSelectedAddress={setSelectedAddress} 
          setFormCurrentLocation={setFormCurrentLocation} 
          marker={marker} 
          setMarker={setMarker} 
          mapRef={mapRef}
          setLat={setLat}
          setLng={setLng}/>
      </MapContainer>
  )
}

export default Map;