import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginuser } from "../../actions/Auth/Auth";

const Login = (props) => {
  let navigate = useNavigate()
  const [logincrudentional, setLogincrudentional] = useState({email: "", password : ""})

  const handleonChange = (e) => {
    setLogincrudentional({ ...logincrudentional, [e.target.name]: e.target.value });
  }

  const handleSubmit = () => {
    console.log(logincrudentional);
    if(logincrudentional.email && logincrudentional.password){
      const body = logincrudentional;
      props.loginAction(body).then((res)=>{
        localStorage.setItem("authToken", res.data.authToken)
        navigate(`/v/${res.data.userName}`);
      }).catch((err)=>{
        console.log("Error", err);
      })
    }else{

    }
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
                className="pl-2 outline-none border-none"
                type="text"
                name="email"
                id="email"
                placeholder="Email Address"
                onChange={handleonChange}
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
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleonChange}
              />
            </div>
            <button
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              onClick={()=>{handleSubmit()}}
            >
              Login
            </button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              <Link to={'/signin'}>SignIn?</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapDispatchToProps = {
    loginAction : loginuser
};
export default connect(null, mapDispatchToProps)(Login);
