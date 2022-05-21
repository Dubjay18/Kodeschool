import { motion } from "framer-motion";
import React from "react";
import { useStateValue } from "../stateProvider";
import readingSvg from "../svgs/undraw_reading_re_29f8.svg";
function Welcome() {
  const [{ user }, dispatch] = useStateValue();
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
      className="flex h-screen justify-center items-center "
    >
      <div className="bg-gradient-to-br from-green-400 to-green-700 md:p-20 sm:p-10 p-1 rounded-xl mx-15 md:flex-row flex flex-col-reverse items-center justify-center">
        <motion.h1
          variants={item}
          initial="hidden"
          animate="show2"
          className="md:text-4xl text-2xl text-white font-poppins font-bold mx-4"
        >
          Welcome, {user}
        </motion.h1>
        <motion.img
          variants={item}
          initial="hidden"
          animate="show"
          src={readingSvg}
          alt=""
          className="w-52"
        />
      </div>
    </motion.div>
  );
}

export default Welcome;
