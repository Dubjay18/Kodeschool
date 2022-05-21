import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/kodecamp logo white.png";

function Navbar() {
  return (
    <div className="flex justify-between items-center p-5">
      <div className="flex">
        <img src={logo} alt="" width={40} />
        <h2 className="font-bold text-slate-700 text-xl font-poppins">
          KodeSchool
        </h2>
      </div>
      <Link
        to="/dashboard"
        className="hover:bg-slate-400 hover:text-white bg-transparent border-2 rounded-lg py-2 px-4 transition-all duration-200"
      >
        Sign In
      </Link>
    </div>
  );
}

export default Navbar;
