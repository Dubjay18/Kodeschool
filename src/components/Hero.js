import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import heropic from "../images/undraw.png";
import elip from "../svgs/Ellipse 154.svg";
import rec from "../svgs/Rectangle 18.svg";
import vec from "../svgs/Vector.svg";
function Hero() {
  const btn = {
    beep: {
      scale: 1.1,
      boxShadow: "0px 0px 8px rgb(0,0,0)",
      textShadow: "0px 0px 8px rgb(0,0,0)",
      transition: {
        yoyo: Infinity,
        duration: 0.3,
      },
    },
  };
  const rect = {
    shift: {
      y: [0, -100, 0],
      x: [0, 100],

      transition: {
        yoyo: 6,
        duration: 0.9,
      },
    },
  };
  const svgVariant = {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { duration: 1, delay: 1.4 },
    },
  };
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        delay: 1.4,
        ease: "easeInOut",
      },
    },
  };
  const circleVariants = {
    hidden: {
      opacity: 0,
      cx: 0,
      cy: 0,
    },
    visible: {
      opacity: 1,
      cx: 21,
      cy: 21,
      transition: {
        duration: 2,
        delay: 1.4,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div className="flex md:flex-row flex-col-reverse relative  sm:p-10 w-full mt-10 h-3/4 ">
      <motion.img
        variants={rect}
        animate="shift"
        src={rec}
        alt=""
        className="absolute w-14 left-1/3 top-20 rotate-180 -z-10"
      />
      {/* <img
        src={vec}
        alt=""
        className=""
      /> */}
      <div className="absolute w-14 -right-2 -top-1 rotate-45 -z-10">
        <motion.svg
          variants={svgVariant}
          initial={"hidden"}
          animate="visible"
          width="35"
          height="39"
          viewBox="0 0 35 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            variants={pathVariants}
            initial={"hidden"}
            animate="visible"
            d="M32.7453 22.2148L5.56051 37.9882C3.25345 39.3255 0.292725 37.7063 0.292725 35.0104V3.46354C0.292725 0.771971 3.24918 -0.851515 5.56051 0.489997L32.7453 16.2634C33.2701 16.563 33.7064 16.9961 34.0098 17.5187C34.3132 18.0413 34.473 18.6348 34.473 19.2391C34.473 19.8434 34.3132 20.437 34.0098 20.9596C33.7064 21.4822 33.2701 21.9152 32.7453 22.2148Z"
            fill="#E2E2E2"
          />
        </motion.svg>
      </div>
      <div className="absolute w-15 md:-top-36 -top-32 rotate-180">
        <motion.svg
          variants={svgVariant}
          initial={"hidden"}
          animate="visible"
          width="100%"
          height="100%"
          viewBox="0 0 42 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            variants={circleVariants}
            initial={"hidden"}
            animate="visible"
            cx="21"
            cy="21"
            r="21"
            fill="blue"
            fill-opacity="0.24"
          />
        </motion.svg>
      </div>
      {/* <img src={elip} alt="" className="absolute w-15 -top-36 rotate-180" /> */}
      <img src={elip} alt="" className="absolute w-15 -bottom-28 -right-20" />
      <div className="lg:py-10 xl:px-32 lg:px-20 px-10 md:w-2/4 flex items-center justify-center md:mt-0 mt-6">
        <div>
          <h1 className="md:text-6xl font-bold font-poppins text-2xl">
            <span className="text-green-500">Learn</span> on your class{" "}
            <span className="text-blue-600">schedule</span>
          </h1>
          <p className="font-poppins">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            doloribus sunt pariatur eos, nulla amet illo deserunt adipisci,
            laudantium nostrum modi consectetur culpa dolorem odio enim? Veniam
            similique modi itaque?
          </p>

          <motion.div
            variants={btn}
            whileHover="beep"
            className="bg-gradient-to-r from-blue-600 to-green-500 w-fit mt-5 py-5 rounded-full border-2 border-white"
          >
            <Link
              to="/dashboard"
              className=" bg-gradient-to-r from-blue-600 to-green-500 px-10 py-5 text-white rounded-full"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
      <div className=" md:w-2/4 w-[90%] overflow-hidden flex items-center justify-center px-3 h-fit">
        <img src={heropic} className="ml-10 h-full max-w-full" alt="" />
      </div>
    </div>
  );
}

export default Hero;
