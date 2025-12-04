import { React, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
const CaptainHome = () => {
  const [ridePopUp, setRidePopUp] = useState(true);
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(false);

  const ridepopUpRef = useRef(null);
  const confirmRidepopUpRef = useRef(null);

  useGSAP(
    function () {
      if (ridePopUp) {
        gsap.to(ridepopUpRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(ridepopUpRef.current, {
          y: "100%",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    },
    [ridePopUp]
  );

  useGSAP(
    function () {
      if (confirmRidePopUp) {
        gsap.to(confirmRidepopUpRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(confirmRidepopUpRef.current, {
          y: "100%",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    },
    [confirmRidePopUp]
  );

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
      <div className="h-3/5">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Home"
          className="w-full h-full object-cover"
        />
      </div>
      {/* captain-details */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* opo-ups */}
      <div
        ref={ridepopUpRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ridePopUp={ridePopUp}
          setRidePopUp={setRidePopUp}
          setConfirmRidePopUp={setConfirmRidePopUp}
        />
      </div>
      <div
        ref={confirmRidepopUpRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          setConfirmRidePopUp={setConfirmRidePopUp}
          setRidePopUp={setRidePopUp}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
