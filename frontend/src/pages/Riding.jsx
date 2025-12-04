import React from "react";
import { Link } from "react-router-dom";
const Riding = () => {
  return (
    <div className="h-screen">
      <Link to='/home' className="fixed h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-home-3-fill"></i>
      </Link>

      <div className="h-1/2">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Home"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-1/2 p-3">
        <div className="flex justify-between items-center p-1">
          <img className="h-20" src="/car.png" alt="profile" />
          <div className="text-right mr-2 mt-2">
            <h3 className="text-lg font-medium">Vinod Kumar</h3>
            <h2 className="text-xl font-bold -mt-1 -mb-1">MH13 AB 2202</h2>
            <p className="text-sm text-gray-400">Black Mahindra XUV 300</p>
            <p className="text-sm text-gray-800">
              <i class="ri-star-s-fill"></i>4.2
            </p>
          </div>
        </div>
        <div className="flex justify-between flex-col items-center gap-2">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
              <i className="text-lg ri-map-pin-3-line"></i>
              <div className="">
                <h3 className="text-lg font-medium">21/89 - NW</h3>
                <p className="text-sm text-gray-500">
                  Domstic Airport, Haturee Wasti, Solapur 413002
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-2 border-gray-500 mb-1">
              <i className="ri-wallet-3-fill"></i>
              <div className="">
                <h3 className="text-lg font-medium">₹193.52</h3>
                <p className="text-sm text-gray-500">payment cash</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              props.setVehicleFound(true);
            }}
            className="w-full text-white font-semibold bg-green-600 rounded-lg px-2 py-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
