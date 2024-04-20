import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AuthProvider from "./contexts/AuthProvider";
import NavBar from "./components/custom/NavBar";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <Router>
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
