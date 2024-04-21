import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const LocationMap = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "locations"));
        const locs = snapshot.docs.map((doc) => doc.data());
        setLocations(locs);
      } catch (error) {
        // Handle any potential errors
        console.error("Error fetching data from Firebase: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
        initialViewState={{
          longitude: 103.81650162109645,
          latitude: 1.3599539706212425,
          zoom: 10.5,
        }}
        style={{ width: 1218, height: "80vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {locations.map((loc) => (
          <Marker
            longitude={loc.coordinates.longitude}
            latitude={loc.coordinates.latitude}
            anchor="bottom"
            color="red"
          />
        ))}
      </Map>
    </>
  );
};

export default LocationMap;
