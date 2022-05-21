import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useStateValue } from "../stateProvider";
import Login from "./Login";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Welcome from "./Welcome";
import Courses from "./Courses";
import Profile from "./Profile";
import {
  ArrowCircleLeftIcon,
  BookOpenIcon,
  UserIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import logo from "../images/kodecamp logo white.png";

import { AnimatePresence } from "framer-motion";
import CourseInfo from "./CourseInfo";

function Dashboard() {
  const [{ user }, dispatch] = useStateValue();
  const loaction = useLocation();
  console.log(location);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        dispatch({
          type: "SET_USER",
          user: userCred.displayName,
        });
        dispatch({
          type: "SET_UID",
          uid: userCred.uid,
        });
        console.log(userCred);
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_UID",
          uid: null,
        });
      }
    });

    return unsubscribe;
  }, [dispatch]);
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: "SET_UID",
          uid: null,
        });
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };
  if (!user) {
    return <Login />;
  }
  return (
    <div className="grid grid-cols-9 h-screen overflow-hidden bg-blue-200">
      <div className="sm:col-span-2 col-span-1 bg-blue-500  py-3 flex flex-col rounded-tr-4xl ">
        <h1 className="mb-8 md:mx-4 sm:pr-5 sm:pl-5 py-2 font-poppins font-bold bg-white flex justify-center items-center rounded-xl md:">
          <img src={logo} className="w-10 h-10" />
          <p className="md:block hidden">KodeSchool</p>
        </h1>
        <Link
          to="/dashboard/"
          className={
            location.pathname === "#/dashboard/"
              ? "text-green-600 md:text-xl ml-1 rounded-l-full font-bold md:pr-10 md:pl-5 sm:py-5 bg-blue-200 my-7 transition-all duration-200 focus:text-green-500 flex justify-center items-center"
              : "text-white md:text-xl ml-1 rounded-l-full font-bold md:pr-10 md:pl-5  sm:py-5 my-7 transition-all duration-200 hover:bg-blue-300 flex justify-center items-center "
          }
        >
          <ViewGridIcon className="w-7 h-7 mr-2" />{" "}
          <p className="md:block hidden">Dashboard</p>
        </Link>
        <Link
          to="/dashboard/courses"
          className={
            location.pathname === "#/dashboard/courses"
              ? "text-green-600 md:text-xl ml-1 rounded-l-full font-bold md:pr-10 md:pl-5 sm:py-5 bg-blue-200 my-7 transition-all duration-200 focus:text-green-500 flex justify-center items-center"
              : "text-white md:text-xl ml-1 rounded-l-full font-bold md:pr-10 md:pl-5 sm:py-5  my-7 transition-all duration-200 hover:bg-blue-300 flex justify-center items-center "
          }
        >
          <BookOpenIcon className="md:w-7 md:h-7 w-10 h-10 mr-2" />
          <p className="md:block hidden">Courses</p>
        </Link>
        <Link
          to="/dashboard/profile"
          className={
            location.pathname === "#/dashboard/profile"
              ? "text-green-600 md:text-xl ml-1 rounded-l-full font-bold md:pr-10 md:pl-5 sm:py-5 bg-blue-200 my-7 transition-all duration-200 focus:text-green-500 flex justify-center items-center"
              : "text-white md:text-xl ml-1 rounded-l-full font-bold md:pr-10 md:pl-5 sm:py-5  my-7 transition-all duration-200 hover:bg-blue-300 flex justify-center items-center "
          }
        >
          <UserIcon className="w-7 h-7 mr-2" />
          <p className="md:block hidden">Profile</p>
        </Link>

        <button
          className="md:mx-5 md:p-3 p-1 mt-auto shadow-btn-2 flex justify-center items-center text-white bg-blue-600 hover:text-green-500"
          onClick={logOut}
        >
          <ArrowCircleLeftIcon className="w-7  hover:rotate-[360deg] duration-500  hover:text-green-500 transition-all cursor-pointer mr-2" />
          <p className="md:block hidden">logout</p>
        </button>
      </div>
      <div className="sm:col-span-7 col-span-8">
        <Routes>
          <Route path={"/"} element={<Welcome />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/course/:name" element={<CourseInfo />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
