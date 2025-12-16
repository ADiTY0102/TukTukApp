import React from 'react';

const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className="p-1 text-center absolute w-[95%] top-0" onClick={()=>{
          props.setVehiclePanel(false);
        }}><i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-sm font-semibold bg-gray-200 rounded-full w-30 px-2 p-2 mb-1.5">Choose ride <i className="ri-arrow-right-s-line"></i> </h3>
        
        <div onClick={()=>{
            props.setConfirmRidePanel(true);
            props.selectVehicle('car');
        }} className="flex active:border-2 border-black w-full  items-center justify-between mb-2 rounded-xl p-3">
          <img className="h-15" src="/car.png" alt="car" />
              <div className="w-1/2">
                <h4 className="font-medium text-base">CaptainGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                <h5 className="font-medium text-sm">3 min Away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable, compact rides.</p>
              </div>
              <h2 className="text-xl font-semibold">₹{props.fare.fare?.car}</h2>              
        </div>
        
        <div onClick={()=>{
            props.setConfirmRidePanel(true);
            props.selectVehicle('auto');
        }} className="flex active:border-2 border-black w-full  items-center justify-between mb-2 rounded-xl p-3">
          <img className="h-15" src="\rikshaw.png" alt="AUTO" />
              <div className="w-1/2">
                <h4 className="font-medium text-base">Auto <span><i className="ri-user-3-fill"></i>2</span></h4>
                <h5 className="font-medium text-sm">3 min Away</h5>
                <p className="font-normal text-xs text-gray-600">Affordable auto rides.</p>
              </div>
              <h2 className="text-xl font-semibold">₹{props.fare.fare?.auto}</h2>              
        </div>
    </div>
  );
}

export default VehiclePanel;
