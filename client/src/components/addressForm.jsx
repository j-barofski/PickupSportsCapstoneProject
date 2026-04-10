import "../styles/addressForm.scss";
import AutoCompletion from "./autoCompletion";
import PropTypes from "prop-types";

AddressForm.propTypes = {
  address: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
};

export default function AddressForm({ address, onSubmit, setAddress }) {
  const handleManualInputChange = (event, stateProperty) => {
    const newAddress = { ...address };
    newAddress[stateProperty] = event.target.value;

    setAddress(newAddress);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="address">Address</label>
      <AutoCompletion
        setAddress={setAddress}
        handleManualInputChange={handleManualInputChange}
        streetAndNumber={address.streetAndNumber}
      />

      <div className="buttons">
        <button type="submit" className="confirm-button">
          Confirm
        </button>
        <button
          type="reset"
          className="reset-button"
          onClick={() =>
            setAddress({
              streetAndNumber: "",
              place: "",
              region: "",
              postcode: "",
              country: "",
              latitude: "",
              longitude: "",
            })
          }
        >
          Reset
        </button>
      </div>
    </form>
  );
}