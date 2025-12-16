import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import axios from "axios";

const LocationSearchPanel = (props) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const query = props.query || "";
    if (!props.openPanel) return setSuggestions([]);
    if (!query || query.length < 3) return setSuggestions([]);

    const token = localStorage.getItem("token");
    const controller = new AbortController();
    const id = setTimeout(() => {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { text: query },
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
          signal: controller.signal,
        })
        .then((res) => {
          setSuggestions(res.data.suggestions || []);
        })
        .catch((err) => {
          if (err.name !== "CanceledError") console.log(err);
        });
    }, 300);

    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [props.query, props.openPanel]);

  const handleSelect = (item) => {
    const address = item.address || item.name || item;
    if (props.activeField === "pickup") {
      props.setPickup(address);
    } else {
      props.setDestination(address);
    }
    // props.setVehiclePanel(true);
    // props.setOpenPanel(false);
  };

  const list = suggestions.length
    ? suggestions
    : [
        // { address: "21/89 Solpaur Domstic Airport, Haturee Wasti, Solapur 413002" },
        // { address: "22B-Tejonidhi,State Bank Of India Jule Solapur 413004" },
        // { address: "33A Relicon Olivia, sector-2 Konark Nagar Solapur" },
      ];

  return (
    <div>
      {list.map(function (elem, index) {
        const label = elem.address || elem.name || "";
        return (
          <div
            key={index}
            onClick={() => handleSelect(elem)}
            className="data flex items-center justify-start gap-4 my-2 p-3 border-gray-100 active:border-black rounded-xl border-2"
          >
            <h2 className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className="font-medium">{label}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
