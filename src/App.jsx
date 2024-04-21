import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AuthProvider from "./contexts/AuthProvider";
import NavBar from "./components/custom/NavBar";
import PrivateRoute from "./routes/PrivateRoute";
import LocationsPage from "./pages/LocationsPage";
import NavigationProvider from "./contexts/NavigationProvider";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const update = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <>
      <Router>
        <NavigationProvider>
          <AuthProvider>
            <NavBar update={update} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <HomePage key={refreshKey} update={update}/>
                  </PrivateRoute>
                }
              />
              <Route
                path="/locations"
                element={
                  <PrivateRoute>
                    <LocationsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage key={refreshKey} update={update}/>
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthProvider>
        </NavigationProvider>
      </Router>
    </>
  );
}

export default App;
