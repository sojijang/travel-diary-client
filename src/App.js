import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import CountrySelection from "./pages/CountrySelection/CountrySelection";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar";
import Map from "./pages/Map/Map";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setCurrentUser(jwtDecode(storedToken).id);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          setCurrentUser={setCurrentUser}
          isLoggedin={isLoggedin}
          setIsLoggedin={setIsLoggedin}
        />
        <Routes>
          <Route path="/" element={<CountrySelection />} />
          <Route
            path="/dashboard"
            element={<Dashboard currentUser={currentUser} />}
          />
          <Route
            path="/login"
            element={
              <Login
                setCurrentUser={setCurrentUser}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/calendar"
            element={<Calendar currentUser={currentUser} />}
          />
          <Route path="/map" element={<Map currentUser={currentUser} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
