import "../styles/Map.scss";
import PropTypes from "prop-types";
import PointerIcon from "../assets/pointer.svg";
import Map, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";
import API from "../api";

const TOKEN = import.meta.env.VITE_TOKEN;

MapFunc.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
};

function MapFunc({ longitude, latitude, updateCoordinates }) {

  console.log("TOKEN:", import.meta.env.VITE_TOKEN);

  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 16,
  });

  const [marker, setMarker] = useState({
    latitude,
    longitude,
  });

  useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));
    
    setMarker({
      latitude,
      longitude,
    })
  }, [latitude, longitude]);

  const handleMarkerDrag = async (event) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;

    setMarker({ latitude, longitude });

    updateCoordinates(latitude, longitude);

    try {
      await API.post("/locations", {
        latitude,
        longitude,
      });
    } catch (err) {
      console.error("Error saving location:", err);
    }
  };

  return (
    <div className="map">
      <Map
        {...viewport}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
        onMove={(event) => {
          setViewport(event.viewState);
        }}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <img className="marker" src={PointerIcon} />
        </Marker>
      </Map>
    </div>
  );
}

export default MapFunc;