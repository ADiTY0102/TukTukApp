import React, {useContext} from "react";
import {CaptainDataContext} from "../context/captainContext";

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext);

  return (
    <div>
      {/* bottom-part-start */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/670fa1f7dbddf8001daedc58.jpg"
            alt="profile-pic-captain"
          />
        </div>
        <div className="-ml-12">
          <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname +" "+ captain.fullname.lastname}</h4>
          <p className="text-sm text-gray-500">Mahindra XUV</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold">₹193.28</h4>
          <p className="text-sm text-gray-500">Earned Today</p>
        </div>
      </div>
      {/* bottom-part-end */}
      <div className="flex justify-center gap-4 items-start bg-gray-100 p-3 rounded-xl mt-3">
        <div className="text-center">
          <i className="text-2xl font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2 hr</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-dashboard-3-line"></i>
          <h5 className="text-lg font-medium">10.2 hr</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2 hr</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
