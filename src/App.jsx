import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  return (
    <>
      <div className="">
        <AnimatePresence>
          <Routes location={location} key={location.key}>
            <Route exact path="/" element={<Home />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
