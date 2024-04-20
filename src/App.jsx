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

function App() {
  return (
    <>
      <Router>
        <NavigationProvider>
          <AuthProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <HomePage />
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
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AuthProvider>
        </NavigationProvider>
      </Router>
    </>
  );
}

export default App;
