import { motion } from "framer-motion";
import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function Home() {
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
        stiffness: 20,
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
  const navContainer = {
    hidden: {
      opacity: 0,
      y: "-100vw",
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.5,
        type: "spring",
        stiffness: 50,
      },
    },
    exit: {
      opacity: 0,
      y: "-100vw",
      transition: {
        delay: 0.7,
        duration: 0.5,
      },
    },
  };
  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <motion.div
        variants={navContainer}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <Navbar />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <Hero />
      </motion.div>
    </div>
  );
}

export default Home;
