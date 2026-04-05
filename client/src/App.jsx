import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import API from "./api";
import AddressForm from "./components/addressForm";
import Map from "./components/map";
import Events from "./components/events";
import AddEvent from "./components/addEvent";
import EditEvent from "./components/editEvent";
import "mapbox-gl/dist/mapbox-gl.css";
import './App.css';

function App() {
  useEffect(() => {
    const testAPI = async () => {
      const res = await API.get("/health");
      console.log(res.data);
    };

    testAPI();
  }, []);

  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  });
  console.log("Address state:", address);
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
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {
            <section id="center">
              <div id="pickup">
                <h1>Play Pickup</h1>
                <p>
                  Meet Up and Join With Others
                </p>
              </div>
              <div className="App">
                <AddressForm
                  onSubmit={handleFormSubmit}
                  address={address}
                  setAddress={setAddress}
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
          }/>

          <Route path="/events/add" element ={<AddEvent address = {address} />}/>
          <Route path="/events/edit/:id" element ={<EditEvent address = {address} />}/>

        </Routes>
      </BrowserRouter>
  );
}

export default App

