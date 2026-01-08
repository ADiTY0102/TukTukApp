import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[95%] top-0"
        onClick={() => {
          props.setRidePopUp(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-sm font-semibold bg-gray-200 rounded-full w-35 pl-2 p-1 mb-1.5">
        Avaliable Rides<i className="ri-arrow-right-s-line"></i>{" "}
      </h3>

      <div className="flex items-center justify-between bg-yellow-300 rounded-lg p-3 mt-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://img.freepik.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg?semt=ais_hybrid&w=740&q=80"
            alt="profile-pic-captain"
          />
          <h2 className="text-lg font-medium">{(props.ride?.user?.fullname?.firstname || "") + " " + (props.ride?.user?.fullname?.lastname || "")}</h2>
        </div>
        <h5 className="text-lg font-semibold">{props.ride?.distance?.toFixed(2)} Km</h5>
      </div>

      <div className="flex justify-between flex-col items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
            <i className="text-lg` ri-map-pin-3-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">{props.ride?.pickup}</h3>
              <p className="text-sm text-gray-500">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
            <i className="text-lg` ri-map-pin-3-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">{props.ride?.destination}</h3>
              <p className="text-sm text-gray-500">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-2 border-gray-500">
            <i className="ri-wallet-3-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-500">payment cash</p>
            </div>
          </div>
        </div>


        <div className="mt-5 w-full flex items-center justify-center text-lg gap-10 p-5">
            <button
          onClick={() => {
            props.setConfirmRidePopUp(true);
            props.confirmRide();
          }}
          className=" text-white font-semibold bg-green-600 rounded-lg p-2 px-8 mt-1"
        >
          Accept
        </button>
        <button
          onClick={() => {
            props.setRidePopUp(false)
          }}
          className=" text-gray-700 font-semibold bg-gray-200 rounded-lg p-2 px-8 mt-1"
        >
          Reject
        </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
