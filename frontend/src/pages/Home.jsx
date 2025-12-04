import React from "react";
import { useState, useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForCaptain from "../components/LookingForCaptain";
import WaitForCaptain from "../components/WaitForCaptain";

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [openPanel, setOpenPanel] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound,setVehicleFound] = useState(false);
  const [waitingForCaptain, setWaitingForCaptain] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForCaptainRef = useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();
  }

 
  useGSAP(function(){
    if(openPanel){
      gsap.to(panelRef.current,{
        height:'70%',
        padding:20,
        duration: 0.3,
        ease: "power3.out"
      })
      gsap.to(panelCloseRef.current,{
        rotate: '180deg',
        opacity:1,
        duration: 0.3
      })
    } else {
      gsap.to(panelRef.current,{
        height:'0%',
        padding:0,
        duration: 0.3,
        ease: "power3.in"
      })
      gsap.to(panelCloseRef.current,{
        opacity:0,
        duration: 0.3
      })
    }
  },[openPanel])

  
  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        y: 0,  
        duration: 0.4,
        ease: "power3.out"
      })
    } else {
      gsap.to(vehiclePanelRef.current,{
        y: "100%",
        duration: 0.4,
        ease: "power3.in"
      })
    }
  },[vehiclePanel])

  
  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      })
    } else {
      gsap.to(confirmRidePanelRef.current,{
        y: "100%",
        duration: 0.4,
        ease: "power3.in"
      })
    }
  },[confirmRidePanel])


    useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      })
    } else {
      gsap.to(vehicleFoundRef.current,{
        y: "100%",
        duration: 0.4,
        ease: "power3.in"
      })
    }
  },[vehicleFound])


    useGSAP(function(){
    if(waitingForCaptain){
      gsap.to(waitingForCaptainRef.current,{
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      })
    } else {
      gsap.to(waitingForCaptainRef.current,{
        y: "100%",
        duration: 0.4,
        ease: "power3.in"
      })
    }
  },[waitingForCaptain])


  return (
    <div className="relative h-screen overflow-hidden">
      <h1 className="text-2xl font-bold absolute mt-7 ml-2">TukTuk</h1>
      <div className="h-screen w-screen">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Home"
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="p-5 h-[30%] bg-white relative">
          <h5 ref={panelCloseRef} onClick={()=>{
            setOpenPanel(false)
          }} className="absolute right-6 top-5 text-2xl">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-2">Find a Trip!</h4>
          <form onSubmit={(e)=>{
            submitHandler(e);
          }}>
            <div className="line absolute h-16 w-1 top-[40%] left-8 bg-gray-700 rounded-full"></div>
            <input
              onClick={()=>{
                setOpenPanel(true);
              }}
              value={pickup}
              onChange={(e)=>{
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-6 py-2 text-base rounded-lg w-full mb-3 placeholder:text-gray-600"
              type="text"
              placeholder="Add a Pick-up Location"
            />
            <input
              onClick={()=>{
                setOpenPanel(true);
              }}
              value={destination}
              onChange={(e)=>{
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-6 py-2 text-base rounded-lg w-full mt-2 placeholder:text-gray-600"
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 overflow-hidden"> 
          <LocationSearchPanel  
            setVehiclePanel={setVehiclePanel}  
            setOpenPanel={setOpenPanel}
          />
        </div>
      </div>

      
      <div ref={vehiclePanelRef} className="fixed w-full z-20 bg-white bottom-0 px-3 py-6">
        <VehiclePanel 
          vehiclePanel={vehiclePanel}
          setVehiclePanel={setVehiclePanel} 
          setConfirmRidePanel={setConfirmRidePanel}  
        />
      </div>

      <div ref={confirmRidePanelRef} className="fixed w-full z-30 bg-white bottom-0 px-3 py-6">
        <ConfirmedRide 
          confirmRidePanel={confirmRidePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div ref={vehicleFoundRef} className="fixed w-full z-30 bg-white bottom-0 px-3 py-6">
        <LookingForCaptain 
          vehicleFound={vehicleFound}
          setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      <div ref={waitingForCaptainRef} className="fixed w-full z-30  bg-white bottom-0 px-3 py-6">
        <WaitForCaptain
          waitingForCaptain={waitingForCaptain}
          setWaitingForCaptain={setWaitingForCaptain}
        />
      </div>
    </div>
  );
};

export default Home;
