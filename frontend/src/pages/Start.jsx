import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-[url('output.jpg')]  h-screen flex  justify-end pt-8 flex-col w-full">
        <h1 className="text-3xl font-bold text-black px-5 justify-start mb-150">
          TukTuk
        </h1>
        <div className="bg-white px-4 py-4 h-40 sticky">
          <h2 className="text-2xl font-bold text-black">
            Get Started With TukTuk
          </h2>
          <Link
            to={"/Login"}
            className="flex items-center justify-center bg-black text-white py-3 rounded-4xl mt-4 w-full"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
