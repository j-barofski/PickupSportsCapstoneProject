import { React, useState } from 'react';
import AddressForm from "./components/addressForm";
import Map from "./components/map";
import "mapbox-gl/dist/mapbox-gl.css";
import './App.css'

function App() {
  // const [search, setSearch] = useState("")

  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (address.streetAndNumber) {
      console.log("Selected address:", address);
    }
  };

  const updateCoordinates = (latitude, longitude) => {
    setAddress({ ...address, latitude, longitude });
  };

  
  return (
      <>
        <section id="center">
          <div>
            <h1>Play Pickup</h1>
            <p>
              Meet Up and Join With Others
            </p>
          </div>

          <div className="App">
            <AddressForm
              onSubmit={handleFormSubmit}
              address={address}
              setAddress={address}
            />
            {address.longitude && address.latitude && (
              <Map
                longitude={address.longitude}
                latitude={address.latitude}
                updateCoordinates={updateCoordinates}
              />
            )}
          </div>
        </section>
      </>
  );
}

export default App

