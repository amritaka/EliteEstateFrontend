import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet's default icon paths for production
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const MapComponent = ({ city, state }) => {
  const [coordinates, setCoordinates] = useState({ lat: 20.5937, lng: 78.9629 }); // Default: India

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!city && !state) return; // If no location provided, do nothing

      try {
        const location = city ? city : state; // Use city if available, otherwise state
        console.log(location)
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
        );
        console.log(response);


        if (response.data.length > 0) {
          setCoordinates({
            lat: parseFloat(response.data[0].lat),
            lng: parseFloat(response.data[0].lon),
          });
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchCoordinates();
  }, [city, state]);

  return (
    <MapContainer
      key={`${coordinates.lat}-${coordinates.lng}`}
      center={[coordinates.lat, coordinates.lng]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
    >

    {/* <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={2} style={{ height: "400px", width: "100%" }}>*/}
        {/* OpenStreetMap Tiles */}
        {/*<TilLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>{city || state || "Location"}</Popup>
        </Marker>
      </MapContainer>
      );
};

      export default MapComponent;
