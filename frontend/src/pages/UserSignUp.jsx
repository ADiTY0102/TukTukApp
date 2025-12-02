import React from "react";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import{ UserDataContext } from '../context/userContext.jsx';


const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  //const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const {user, setUser} = React.useContext(UserDataContext);


  const submitHandler = async(e) => {
    e.preventDefault();

    const newUser ={
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status === 201){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home')
    }

    // console.log(userData);
    // setEmail("");
    // setPassword("");
    // setFirstname("");
    // setLastname("");
  };

  return (
    <div>
      <div className="p-7 flex flex-col justify-between">
        <div className="user">
          <img src="TukTuk-logo.png" alt="myLogo" className="h-50 w-50 mx-15" />
          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-medium mb-2">What's Your Name</h3>
            <div className="flex gap-4">
              <input
                className="bg-[#eeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base placeholder:text-gray-400 mb-7"
                type="text"
                required
                placeholder="First Name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
              <input
                className="bg-[#eeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base placeholder:text-gray-400 mb-7"
                type="text"
                required
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's Your Email</h3>
            <input
              className="bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base placeholder:text-gray-400 mb-7"
              type="email"
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base placeholder:text-gray-400 mb-7"
              type="password"
              required
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg mb-2">
              SIGN UP
            </button>
            <p className="text-center mb-8">
              Already have an account?{" "}
              <Link to={"/Login"} className="text-blue-500">
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div className="captain flex gap-1">
          <input type="checkbox" />
          <p className="text-xs p-2">
            By proceeding you consent to get calls, emails and SMS messages,
            including by automated means from <b>TukTuk </b>
            and it's affiliates to the email provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
