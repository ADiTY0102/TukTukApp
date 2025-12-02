import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from '../context/CaptainContext.jsx'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const {captain, setCaptain} = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();

    const captain = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      console.error('Captain login failed', err);
      // optionally show user feedback here
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between">
      <div className="user">
        <img src="TukTuk-logo.png" alt="myLogo" className="" />
        {/* <h1 className="text-2xl font-bold text-center mb-5">Captain</h1> */}
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
          <input
            className="bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base placeholder:text-gray-400 mb-7"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            required
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base placeholder:text-gray-400 mb-7"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            required
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg mb-2">
            CAPTAIN LOGIN
          </button>
          <p className="text-center mb-8">
            Join us?{" "}
            <Link to={"/captain-signUp"} className="text-blue-500">
              Register as a Captain!
            </Link>
          </p>
        </form>
      </div>
      <div className="captain">
        <Link
          to={"/Login"}
          className="bg-green-600 text-white font-semibold rounded px-4 py-2 w-full text-lg mb-7 flex items-center justify-center"
        >
          User Login
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
