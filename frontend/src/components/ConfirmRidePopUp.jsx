import React from 'react';
import { Link } from 'react-router-dom';
const ConfirmRidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[95%] top-0"
        onClick={() => {
          props.setConfirmRidePopUp(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-sm font-semibold bg-gray-200 rounded-full w-35 pl-2 p-1 mb-1.5">
        Confirm Ride<i className="ri-arrow-right-s-line"></i>{" "}
      </h3>

      <div className="flex items-center justify-between bg-yellow-300 rounded-lg p-3 mt-3">
        <div className="flex items-center gap-3">
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
        <Link to={'/captain/riding'}
          onClick={() => {
            props.setConfirmRidePopUp(false);
          }}
          className="w-full flex justify-center text-white font-semibold bg-green-600 rounded-lg p-2"
        >
          Confirm
        </Link>
        <button
          onClick={() => {
            props.setRidePopUp(false);
            props.setConfirmRidePopUp(false);
          }}
          className="w-full text-gray-700 font-semibold bg-gray-200 rounded-lg p-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmRidePopUp;
