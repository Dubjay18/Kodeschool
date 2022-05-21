import React from "react";
import { useNavigate } from "react-router-dom";
import courses from "../db";
import { motion } from "framer-motion";

function Courses() {
  const navigate = useNavigate();
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
      className="h-screen overflow-y-scroll w-fit"
    >
      <motion.div
        variants={item}
        initial="hidden"
        animate="show2"
        className=" flex-col  justify-center "
      >
        <h1 className=" flex  justify-center my-8 font-poppins underline text-gray-900 md:text-3xl">
          Courses
        </h1>
        <div className="my-24 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 ">
          {courses.map((course, i) => {
            return (
              <div
                className={
                  i % 2 === 0
                    ? "bg-green-400 md:p-20 p-10 text-white mx-6 my-6 hover:scale-105 transition-all duration-200 cursor-pointer"
                    : "md:p-20  p-10 bg-slate-200 text-green-400 mx-6 my-6 hover:scale-105 transition-all duration-200 cursor-pointer"
                }
                onClick={() => navigate(`/dashboard/course/${course.name}`)}
                key={i}
              >
                <div className="w-fit p-4 bg-white rounded-full text-blue-600">
                  <img src={course.src} className="w-full" alt="" />
                  {console.log(course.src)}
                </div>
                <div className="font-poppins text-xl">{course?.name}</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Courses;
