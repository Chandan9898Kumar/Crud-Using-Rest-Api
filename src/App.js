import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Loader from "./Loader/Loader";
const NavLinks = lazy(() => import("./NavLinks/NavLink"));
const AccountLogin = lazy(() => import("./Login/Login"));
const AccountRegister = lazy(() => import("./Register/Register"));
const Home = lazy(() => import("./HomePage/HomePage"));

function App() {

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <NavLinks />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<AccountLogin />} />
            <Route exact path="/register" element={<AccountRegister />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
  
}

export default App;
