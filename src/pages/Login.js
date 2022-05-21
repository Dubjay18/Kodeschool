import React from "react";
import log from "../images/images.png";
import logo from "../images/kodecamp logo white.png";
import {
  ArrowCircleLeftIcon,
  LockClosedIcon,
  UserIcon,
  CogIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useStateValue } from "../stateProvider";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [signUp, setSignUp] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [disable, setDisable] = useState(false);
  const [text, setText] = useState("");
  const [lastName, setLastName] = useState("");

  const container = {
    hidden: {
      opacity: 0,
      x: "-100vw",
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.7,
        duration: 0.5,
        type: "spring",
        stiffness: 50,
        bounce: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: "-100vw",
      transition: {
        delay: 0.4,
        duration: 0.5,
      },
    },
  };
  const load = {
    loading: {
      rotate: 360,
      transition: {
        yoyo: Infinity,
        duration: 0.6,
      },
    },
  };
  const register = (e) => {
    e.preventDefault();
    setDisable(true);
    if (password !== password2) {
      setDisable(false);
      return AlertDismissible("Passwords don't match");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        await setDoc(doc(db, "users", name), {
          name: `${name} ${lastName}`,
          email: email,
        });
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            AlertDismissible("Student Registered");
            console.log(name);
            window.location.reload();
          })
          .catch((error) => {
            setDisable(false);
            alert(error?.message);
          });
        // ...
      })
      .catch((error) => {
        setDisable(false);
        alert(error?.message);
        // ..
      });
  };
  const SignIn = (e) => {
    e.preventDefault();
    setDisable(true);
    if (email === "") {
      setDisable(false);
      return AlertDismissible("Please type in your email", true);
    }
    if (password === "") {
      setDisable(false);
      return AlertDismissible("Please type in your password", true);
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        AlertDismissible("Login successful");
      })
      .catch((error) => {
        setDisable(false);
        AlertDismissible(error.message, true);
      });
  };
  const handleReset = (e) => {
    e.preventDefault();
    setDisable(true);
    forgotPassword(email);
  };
  const forgotPassword = (Email) => {
    if (Email === "") {
      return AlertDismissible("Please type in your email", true);
    }
    sendPasswordResetEmail(auth, Email)
      .then(function () {
        AlertDismissible("Please Check your email...");
        setDisable(false);
        setTimeout(() => {
          // setShow(false);
          window.location.reload();
        }, 2000);
      })
      .catch(function (error) {
        AlertDismissible(error.message, true);
        setDisable(false);
      });
  };
  async function AlertDismissible(words, error) {
    if (!error) {
      toast.success(words, {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(words, {
        position: "top-center",
        autoClose: 1400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className="flex items-center h-screen justify-center bg-gradient-to-br from-blue-600 to-green-400">
      <ToastContainer
        position="top-center"
        autoClose={1400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        className="shadow-lg max-w-screen-lg h-full md:max-h-[600px] w-full mx-2 md:p-10 px-5 md:flex rounded-2xl  bg-white "
      >
        <HomeIcon
          className="w-10 h-10 text-green-400 hover:text-green-500 transition-all cursor-pointer hover:rotate-[360deg] duration-500 hover:scale-125"
          onClick={() => navigate("/")}
        />
        {forgot ? (
          <div className="flex flex-col w-full h-full md:py-28 pt-44 md:px-32">
            <div className="grid grid-cols-7">
              <ArrowCircleLeftIcon
                className="w-10 h-10 col-span-2 hover:rotate-[360deg] duration-500 text-blue-500 hover:text-green-500 transition-all cursor-pointer"
                onClick={() => setForgot(false)}
              />
              <h1 className="font-bold md:text-3xl text-2xl col-span-5">
                Password Reset
              </h1>
            </div>

            <form>
              <div className="border-b-2 flex items-center justify-between my-4 border-gray-600">
                <input
                  type="text"
                  className="p-2 border-0 w-full outline-none placeholder:text-gray-400"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <UserIcon className="w-10 h-10 text-gray-400" />
              </div>
              <button
                type="submit"
                className="hover:bg-gradient-to-br hover:from-green-500 hover:to-blue-600 transition-all duration-200 text-white px-6 py-2 bg-blue-500 w-full rounded-full flex items-center justify-center my-6"
                disabled={disable}
                onClick={handleReset}
              >
                {disable ? (
                  <CogIcon className="text-white w-10 h-10 animate-spin" />
                ) : (
                  " Reset"
                )}
              </button>
            </form>
          </div>
        ) : (
          <>
            {" "}
            <div className="flex md:w-2/3 flex-col my-10">
              <div className="p-4">
                <h1 className="font-bold md:text-3xl text-2xl">
                  {signUp ? "Student Registeration" : "Student Login"}
                </h1>
                <p className="text-gray-500  font-poppins">
                  make sure your account is secure
                </p>
              </div>
              <div className="h-full hidden md:block">
                <img
                  src={log}
                  className="h-full hidden md:block max-w-full object-contain"
                  alt=""
                />
              </div>
            </div>
            <div className="md:w-2/3 py-4 md:px-16">
              <img src={logo} alt="" />
              <form>
                {signUp && (
                  <div className="border-b-2 flex items-center justify-between my-4 border-gray-600">
                    <input
                      type="text"
                      className="p-2 border-0 w-full outline-none placeholder:text-gray-400"
                      placeholder="First name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <UserIcon className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                {signUp && (
                  <div className="border-b-2 flex items-center justify-between my-4 border-gray-600">
                    <input
                      type="text"
                      className="p-2 border-0 w-full outline-none placeholder:text-gray-400"
                      placeholder="last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <UserIcon className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <div className="border-b-2 flex items-center justify-between my-4 border-gray-600">
                  <input
                    type="text"
                    className="p-2 border-0 w-full outline-none placeholder:text-gray-400"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <UserIcon className="w-10 h-10 text-gray-400" />
                </div>
                <div className="border-b-2  flex items-center justify-between my-4 border-gray-600">
                  <input
                    type="password"
                    className="p-2 border-0  w-full outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <LockClosedIcon className="w-10 h-10 text-gray-400" />
                </div>
                {signUp && (
                  <div className="border-b-2  flex items-center justify-between my-4 border-gray-600">
                    <input
                      type="password"
                      className="p-2 border-0  w-full outline-none"
                      placeholder="Confirm Password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                    <LockClosedIcon className="w-10 h-10 text-gray-400" />
                  </div>
                )}
                <div className="flex justify-between">
                  {signUp ? (
                    <>
                      {" "}
                      <p className="text-gray-400 cursor-pointer  font-poppins">
                        Have an account?
                      </p>
                      <p
                        className="text-gray-400 cursor-pointer  font-poppins"
                        onClick={() => setSignUp(false)}
                      >
                        Sign in
                      </p>
                    </>
                  ) : (
                    <>
                      {" "}
                      <p
                        className="text-gray-400 cursor-pointer  font-poppins"
                        onClick={() => setForgot(true)}
                      >
                        Forgot Password?
                      </p>
                      <p
                        className="text-gray-400 cursor-pointer  font-poppins"
                        onClick={() => setSignUp(true)}
                      >
                        Register
                      </p>
                    </>
                  )}
                </div>
                {signUp ? (
                  <button
                    type="submit"
                    className="hover:bg-gradient-to-br hover:from-green-500 hover:to-blue-600 transition-all duration-200 text-white px-6 py-2 bg-blue-500 flex items-center justify-center w-full rounded-full my-6"
                    disabled={disable}
                    onClick={register}
                  >
                    {" "}
                    {disable ? (
                      <CogIcon className="text-white w-10 h-10 animate-spin" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="hover:bg-gradient-to-br hover:from-green-500 hover:to-blue-600 transition-all duration-200 text-white px-6 py-2 bg-blue-500 w-full rounded-full my-6 flex items-center justify-center"
                    disabled={disable}
                    onClick={SignIn}
                  >
                    {disable ? (
                      <CogIcon className="text-white w-10 h-10 animate-spin" />
                    ) : (
                      "LOGIN"
                    )}
                  </button>
                )}
              </form>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Login;
