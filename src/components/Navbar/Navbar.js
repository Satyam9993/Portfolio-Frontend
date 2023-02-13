import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import {logout} from '../../actions/Auth/Auth'
import store from '../../store'



const Navbar = ({logoutAction, loginUserRedux}) => {

  const location = useLocation();
  const [loggedIn, setloggedIn] = useState(false)

  const pathName = location.pathname.slice(3)

  useEffect(() => {
    if(localStorage.getItem('authToken')){
      setloggedIn(true);
    }
  }, [])
  
  
  const handleLogout = ()=>{
    logoutAction();
    localStorage.removeItem('authToken');
    setloggedIn(false);
  }
  
  return (
    <header className="text-gray-600 body-font" id="home">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Port-Folio</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" to="#home">Home</Link>
          <Link className="mr-5 hover:text-gray-900" to="#experience">Experience</Link>
          <Link className="mr-5 hover:text-gray-900" to="#contact">Contact</Link>
          <Link className="mr-5 hover:text-gray-900" to="#skills">Skills</Link>
          <Link className="mr-5 hover:text-gray-900" to="#project">Project</Link>
          <Link className="mr-5 hover:text-gray-900" to="#education">Education</Link>
        </nav>
        {(loggedIn && pathName !== loginUserRedux.loginUserName ) && <Link className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mx-3" to={`/v/${loginUserRedux.loginUserName}`}>
          Your Portfolio
        </Link>}
        {!loggedIn ?
        <Link className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" to="/login">
          Login
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>:
        <Link className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={handleLogout}>
        logout
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </Link>
      }
      </div>
    </header>
  );
};

const mapDispatchToProps = {
  logoutAction: logout
};

const mapStateToProps = (state) => {
  return {
    loginUserRedux: state?.loginuser?.LoginUser
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
