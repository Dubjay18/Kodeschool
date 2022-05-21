import React, { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./../firebase";
import { useState } from "react";
import { useStateValue } from "./../stateProvider";
import { onAuthStateChanged } from "firebase/auth";
import pp from "../images/profilepic.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function Profile() {
  const [{ user }] = useStateValue();
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [name, setName] = useState("");
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
  useEffect(() => {
    async function fetchProfile() {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        onAuthStateChanged(auth, (userCred) => {
          if (userCred) {
            setEmail(userCred.email);
          } else {
            AlertDismissible("Error: User not logged in", true);
          }
        });
        if (docSnap.data()?.name) {
          setName(docSnap.data()?.name);
        }
        if (docSnap.data().address) {
          setAddress(docSnap.data()?.address);
        }
        if (docSnap.data().zipcode) {
          setZipCode(docSnap.data()?.zipcode);
        }
        if (docSnap.data().country) {
          setCountry(docSnap.data()?.country);
        }
        if (docSnap.data().state) {
          setState(docSnap.data()?.state);
        }
      } else {
        // doc.data() will be undefined in this case
        AlertDismissible(" User not found in DB", true);
      }
    }
    fetchProfile();
  }, []);

  async function updateProfile(e) {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", user), {
        name: name,
        state: state,
        country: country,
        email: email,
        address: address,
        zipcode: zipCode,
      });
      AlertDismissible("Profile Update was Succesful");
    } catch (error) {
      AlertDismissible(error?.message, true);
    }
  }
  const container = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
        type: "spring",
        stiffness: 20,
      },
    },
    exit: {
      opacity: 0,
      x: "100vw",
      transition: {
        delay: 0.4,
        duration: 0.5,
      },
    },
  };
  const item = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.4,
      },
    },
    show2: {
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="h-screen overflow-y-scroll"
    >
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
      <div className="grid grid-cols-6 mx-3">
        <h1 className="font-poppins md:text-3xl text-lg mt-3 col-span-6">
          Profile Setting
        </h1>
        <p className="text-gray-500 font-poppins md:text-xl text-md mt-3 col-span-6">
          Personal Details
        </p>
      </div>
      <div className="grid grid-cols-6 my-6">
        <div className="md:col-span-3"></div>
        <div className="col-span-1 rounded-full h-fit w-60">
          <div className="rounded-full md:w-60 md:h-56 w-32 h-28">
            <img
              src={pp}
              alt=""
              className="rounded-full w-full object-cover my-4 h-full"
            />
          </div>
        </div>
      </div>

      <motion.form
        variants={item}
        initial="hidden"
        animate="show2"
        className="mx-2 grid grid-cols-6 gap-2 font-poppins"
        onSubmit={updateProfile}
      >
        <div className="p-2 border-2 sm:col-span-3 col-span-6 flex flex-col">
          <label className="text-gray-500">Full Name</label>
          <input
            className="outline-none px-2 py-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="p-2 border-2 sm:col-span-3 col-span-6 flex flex-col">
          <label className="text-gray-500">Email Address</label>
          <input
            className="outline-none px-2 py-2"
            type="text"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="p-2 border-2 col-span-6 flex flex-col">
          <label className="text-gray-500">Address</label>
          <input
            className="outline-none px-2 py-2"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="p-2 border-2 sm:col-span-3 col-span-6 flex flex-col">
          <label className="text-gray-500">Country</label>
          <input
            className="outline-none px-2 py-2"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="p-2 border-2 sm:col-span-3 col-span-6 flex flex-col">
          <label className="text-gray-500">State/Province</label>
          <input
            className="outline-none px-2 py-2"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="p-2 border-2 sm:col-span-3 col-span-6 flex flex-col">
          <label className="text-gray-500">Zip Code</label>
          <input
            className="outline-none px-2 py-2"
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div className="sm:col-span-3"></div>
        <div className="sm:col-span-2"></div>
        <div className="">
          <button
            className="rounded-tr-full rounded-bl-full my-5 sm:py-5 py-3 px-10 bg-green-600 text-white hover:bg-green-300 transition-all duration-500 ease-in-out"
            type="submit"
          >
            Update
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default Profile;
