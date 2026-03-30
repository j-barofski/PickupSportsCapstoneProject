import axios from "axios";

export default async function getAddress(query) {
  const token = import.meta.env.VITE_TOKEN;

  if (!token) {
    console.error("Token is missing!");
    return;
  }

  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: import.meta.env.VITE_TOKEN,
        },
      }
    );
    
    return response.data.features;
  } catch (error) {
    console.error("There was an error getting locations:", error);
  }
}