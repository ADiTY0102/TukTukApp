import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = (props) => {
  const location = [
    "21/89 Solpaur Domstic Airport, Haturee Wasti, Solapur 413002",
    "22B-Tejonidhi,State Bank Of India Jule Solapur 413004",
    "33A Relicon Olivia, sector-2 Konark Nagar Solapur",
  ];

  return (
    <div>
      {location.map(function (elem,index) {
        return (
          <div
          key={index}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setOpenPanel(false);
            }}
            className="data flex items-center justify-start gap-4 my-2 p-3 border-gray-100 active:border-black rounded-xl border-2"
          >
            <h2 className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
              <i className="ri-plane-line"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
