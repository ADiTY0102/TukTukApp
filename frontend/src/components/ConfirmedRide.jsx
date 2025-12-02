import React from "react";

const ConfirmedRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[95%] top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-sm font-semibold bg-gray-200 rounded-full w-40 px-2 p-2 mb-1.5">
        Confirm Your Ride <i className="ri-arrow-right-s-line"></i>{" "}
      </h3>

      <div className="flex justify-between flex-col items-center gap-2">
        <img className="h-40" src="/car-asset.jpg" alt="car" />

        <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
                <i className="text-lg` ri-map-pin-3-fill"></i>
                <div className="">
                    <h3 className="text-lg font-medium">562/11 -WS</h3>
                    <p className="text-sm text-gray-500">Kambar Talav, Vijapur road solapur</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
                <i className="text-lg` ri-map-pin-3-line"></i>
                <div className="">
                    <h3 className="text-lg font-medium">21/89 - NW</h3>
                    <p className="text-sm text-gray-500">Domstic Airport, Haturee Wasti, Solapur 413002</p>
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
        <button className="w-full text-white font-semibold bg-green-600 rounded-lg">Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
