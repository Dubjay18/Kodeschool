import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import courses from "../db";
import NotFound from "./NotFound";

function CourseInfo() {
  const [trailerUrl, setTrailerUrl] = React.useState("");
  const [subj, setSubj] = React.useState([]);
  let { name } = useParams();
  const opts = {
    height: "390",
    width: "100%",
    borderRadius: "0px, 30px",
    playersVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    async function fetchDb() {
      await setSubj(courses.find((course) => course.name === name));
      return subj;
    }
    fetchDb();
    setTrailerUrl(subj.id);
    console.log(trailerUrl);
  }, [subj]);

  if (!subj) return <NotFound />;
  return (
    <div className="h-screen overflow-y-scroll">
      <div className="md:mx-20 sm:mx-10 mx-4  my-10">
        {" "}
        {trailerUrl ? (
          <YouTube videoId={trailerUrl} opts={opts} className="rounded-t-lg" />
        ) : (
          <h1 className=" italic font-thin dark:text-white text-slate-600 ">
            Trailer not avaliable
          </h1>
        )}
        <div>
          <h1 className="font-bold font-poppins my-4 text-lg">
            Introduction to {name}
          </h1>
          <p className="font-poppins">{subj?.details?.intro}</p>
          <h1 className="font-bold font-poppins my-4 text-lg">Branches</h1>
          <ul>
            {" "}
            {subj?.details?.branches.map((branch, i) => {
              return (
                <li key={i} className="font-poppins">
                  {branch}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
