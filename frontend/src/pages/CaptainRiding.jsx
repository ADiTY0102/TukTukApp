import React from 'react';
import { Link } from 'react-router-dom';
const CaptainRiding = () => {
  return (
    <div className="h-screen">
      <div className=" fixed p-3 w-screen flex justify-between items-center">
        <h1 className="text-2xl font-bold">TUkTuk.</h1>
        <Link
          to="/captain-login"
          className="h-10 w-10  bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* map-part */}
      <div className="h-4/5">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Home"
          className="w-full h-full object-cover"
        />
      </div>
      {/* captain-details */}
      <div className="h-1/5 p-6">
        
      </div>
      
      
    </div>
  );
}

export default CaptainRiding;