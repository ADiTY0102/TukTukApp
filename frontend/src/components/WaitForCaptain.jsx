import React from 'react';

const WaitForCaptain = (props) => {
  return (
     <div>
      <h5
        className="p-1 text-center absolute w-[95%] top-0"
        onClick={() => {
          props.setWaitingForCaptain(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-sm font-semibold bg-gray-200 rounded-full w-45 px-2 p-2 mb-1.5">
         Waiting for Captain <i className="ri-arrow-right-s-line"></i>
      </h3>
      <div className='flex items-center justify-between'>
        <img className='h-18' src="/car.png" alt="profile-pic" />
        <div className='text-right'>
            <h3 className='text-lg font-medium'>Vinod Kumar</h3>
            <h2 className='text-xl font-bold -mt-1 -mb-1'>MH13 AB 2202</h2>
            <p className='text-sm text-gray-400'>Black Mahindra XUV 300</p>
            <p className='text-sm text-gray-800'><i className="ri-star-s-fill"></i>4.2</p>

        </div>
      </div>

      <div className="flex justify-between flex-col items-center gap-2">
        

        <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
                <i className="text-lg ri-map-pin-3-fill"></i>
                <div className="">
                    <h3 className="text-lg font-medium">562/11 -WS</h3>
                    <p className="text-sm text-gray-500">Kambar Talav, Vijapur road solapur</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-2 border-b-1 border-gray-500">
                <i className="text-lg ri-map-pin-3-line"></i>
                <div className="">
                    <h3 className="text-lg font-medium">21/89 - NW</h3>
                    <p className="text-sm text-gray-500">Domstic Airport, Haturee Wasti, Solapur 413002</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-2 border-gray-500 mb-5">
                <i className="ri-wallet-3-fill"></i>
                <div className="">
                    <h3 className="text-lg font-medium">₹193.52</h3>
                    <p className="text-sm text-gray-500">payment cash</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default WaitForCaptain;
