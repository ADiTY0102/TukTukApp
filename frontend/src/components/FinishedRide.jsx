import React from 'react';
import { Link } from "react-router-dom";

const FinishedRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[95%] top-2"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-lg font-semibold pl-0 p-1 mb-1.5">
        Finish This Ride<i className="ri-arrow-right-s-line"></i>{" "}
      </h3>

      <div className="flex items-center justify-between mt-4 bg-yellow-300 rounded-lg p-3">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://img.freepik.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg?semt=ais_hybrid&w=740&q=80"
            alt="profile-pic-captain"
          />
          <h2 className="text-lg font-medium">Geetha Ramachandran</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 Km</h5>
      </div>

      <div className="flex justify-between flex-col items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
            <i className="text-lg` ri-map-pin-3-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11 -WS</h3>
              <p className="text-sm text-gray-500">
                Kambar Talav, Vijapur road solapur
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
            <i className="text-lg` ri-map-pin-3-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">21/89 - NW</h3>
              <p className="text-sm text-gray-500">
                Domstic Airport, Haturee Wasti, Solapur 413002
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-gray-500">
            <i className="ri-wallet-3-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹193.52</h3>
              <p className="text-sm text-gray-500">payment cash</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Link
              to={"/captain/riding"}
              className="w-full flex justify-center text-white font-semibold bg-green-600 rounded-lg p-2"
            >
              Finish Ride
            </Link>
            <p className='text-red-500 flax items-center justify-center'>Click on finish ride if you have completed the payment, ride.</p>
        </div>
      </div>
    </div>
  );
}

export default FinishedRide;
