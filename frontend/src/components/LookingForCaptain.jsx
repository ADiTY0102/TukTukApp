import React from 'react';

const LookingForCaptain = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[95%] top-0"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-sm font-semibold bg-gray-200 rounded-full w-45 px-2 p-2 mb-1.5">
        Looking For a Driver <i className="ri-arrow-right-s-line"></i>{" "}
      </h3>

      <div className="flex justify-between flex-col items-center gap-2">
        <img className="h-40" src="/car-asset.jpg" alt="car" />

        <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
                <i className="text-lg ri-map-pin-3-fill"></i>
                <div className="">
                    <h3 className="text-lg font-medium">Current Location</h3>
                    <p className="text-sm text-gray-500">{props.pickup}</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
                <i className="text-lg ri-map-pin-3-line"></i>
                <div className="">
                    <h3 className="text-lg font-medium">Destination</h3>
                    <p className="text-sm text-gray-500">{props.destination}</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-2 border-gray-500 mb-5">
                <i className="ri-wallet-3-fill"></i>
                <div className="">
                    <h3 className="text-lg font-medium">₹{props.fare?.fare?.[props.vehicleType] ?? 0}</h3>
                    <p className="text-sm text-gray-500">payment cash</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LookingForCaptain;
