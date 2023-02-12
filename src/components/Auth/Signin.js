import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {signinAction, VerifyOtpAction} from  "../../actions/Auth/Auth"


const Login = ({VerifyOtpActionR}) => {
  const navigate = useNavigate()

  const [isemailsend, setIsemailsend] = useState(false)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [age, setAge] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState()

  const handleOnchangeemail = (e) => {
    setEmail(e.target.value)
  }
  const handleOnchangeusername = (e) => {
    setUsername(e.target.value)
  }
  const handleOnchangeage = (e) => {
    setAge(e.target.value)
  }
  const handleOnchangepassword = (e) => {
    setPassword(e.target.value)
  }
  const handleOnchangeotp = (e) => {
    setOtp(e.target.value)
  }

  const handleOnSubmit = () => {
    const body = {
      email : email,
      username : username,
      password : password,
      age : age
    }
    signinAction(body).then((res)=>{
      setIsemailsend(true)
    }).catch((err)=>{
    })
  }

  const handleVerify = () => {
    const body = {
      email : email,
      otp : otp
    }
    VerifyOtpActionR(body).then((res)=>{
      localStorage.setItem("authToken", res.data.authToken)
      navigate(`/v/${res.data.userName}`);
    }).catch((err)=>{
      console.log("Error");
    })
  }

  return (
    <div>
      <div className="h-screen flex">
        <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">PortFolio</h1>
            <p className="text-white mt-1">
              Create Your own Portfolio and Customize it.
            </p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
        </div>
        <div className="flex w-1/2 justify-center items-center bg-white">
          <div className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">SignIn</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round" 
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none bg-white"
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                onChange={(e)=>{handleOnchangeemail(e)}}
                disabled={isemailsend}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
             <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#adadac" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              >
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
                <circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/>
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="number"
                name="age"
                id="age"
                placeholder="Age"
                onChange={(e)=>{handleOnchangeage(e)}}
                disabled={isemailsend}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
             <svg 
              xmlns="http://www.w3.org/2000/svg"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#adadac" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              >
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
                <circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/>
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                disabled={isemailsend}
                onChange={(e)=>{handleOnchangeusername(e)}}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                disabled={isemailsend}
                onChange={(e)=>{handleOnchangepassword(e)}}
              />
            </div>
            {isemailsend && <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="otp"
                id="opt"
                placeholder="OTP"
                onChange={(e)=>{handleOnchangeotp(e)}}
              />
            </div>}
            {isemailsend?
            <button
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              onClick={()=>{handleVerify()}}
            >
              Verify
            </button>:
            <button
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              onClick={()=>{handleOnSubmit()}}
            >
              Login
            </button>}
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              <Link to={'/login'}>Login ?</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  VerifyOtpActionR : VerifyOtpAction
};
export default connect(null, mapDispatchToProps)(Login)
