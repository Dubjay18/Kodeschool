import React from "react";
import { Link } from "react-router-dom";
import Pre from "../images/Preloader_1.gif";
function NotFound() {
  return (
    <div className="h-screen overflow-hidden flex justify-center items-center bg-slate-50">
      <div className="flex flex-col justify-center items-center">
        <img src={Pre} className="w-14" alt="" />
        <h1 className="sm:text-4xl text-2xl font-bold mt-6 mb-6 text-green-500">
          <span className="text-blue-800">Error 404:</span> Page not found
        </h1>
        <Link
          to="/"
          className="roundedd bg-green-400 text-white hover:scale-125 transition-all duration-300 p-5 w-fit"
        >
          HomePage
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
