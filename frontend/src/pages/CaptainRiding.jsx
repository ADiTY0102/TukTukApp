import {React,useState,useRef} from "react";
import { Link } from "react-router-dom";
import FinishedRide from "../components/FinishedRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);



  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          y: "100%",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    },
    [finishRidePanel]
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
      <div className="h-[85%]">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Home"
          className="w-full h-full object-cover"
        />
      </div>
      {/* captain-details */}
      <div onClick={()=>{
        setFinishRidePanel(true)
      }} className="h-[15%] p-6 bg-yellow-400 flex items-center justify-between relative rounded-t-3xl">
        <h5
          className="p-1 text-center absolute w-screen top-0"
          onClick={() => {
            props.setConfirmRidePopUp(false);
          }}
        >
          <i className="text-3xl text-gray-900 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-lg font-semibold">4 km Away.</h4>
        <button className="bg-black p-2 font-semibold px-10 rounded-lg text-white">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishedRide
          finishRidePanel={finishRidePanel}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
