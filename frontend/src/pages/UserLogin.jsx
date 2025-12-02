import React, { useState,  } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from '../context/userContext.jsx';
import { useNavigate } from "react-router-dom";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData , setUserData] = useState({});

  const {user, setUser} = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();

    const userData= {
        email:email, 
        password:password
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if(response.status === 200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home')
    }

    //console.log(userData);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between">
      <div className="user">
        <img src="TukTuk-logo.png" alt="myLogo" className="" />
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
            LOGIN
          </button>
          <p className="text-center mb-8">
            New here?{" "}
            <Link to={"/SignUp"} className="text-blue-500">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div className="captain">
        <Link to={"/captain-login"} className="bg-blue-500 text-white font-semibold rounded px-4 py-2 w-full text-lg mb-7 flex items-center justify-center">
          Captain LogIn
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
