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
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import ChatProvider from "./contexts/ChatProvider";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const update = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <>
      <Router>
        <AuthProvider>
          <ChatProvider>
            <NavBar update={update} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <HomePage key={refreshKey} update={update} />
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
                    <ProfilePage key={refreshKey} update={update} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <PrivateRoute>
                    <MessagesPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ChatProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
