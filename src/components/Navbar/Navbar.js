import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { logout } from '../../actions/Auth/Auth';

const Navbar = ({ logoutAction, loginUserRedux, showAlert }) => {

  const location = useLocation();
  const [loggedIn, setloggedIn] = useState(false)

  const pathName = location.pathname.slice(3)

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setloggedIn(true);
    }
  }, [])


  const handleLogout = () => {
    logoutAction();
    localStorage.removeItem('authToken');
    setloggedIn(false);
    showAlert("Suceessfully Logout!!", "success")
  }

  return (
    <header className="text-gray-600 body-font" id="home">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl">PortFolio Builder</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" to="#home">Home</Link>
          <Link className="mr-5 hover:text-gray-900" to="#experience">Experience</Link>
          <Link className="mr-5 hover:text-gray-900" to="#contact">Contact</Link>
          <Link className="mr-5 hover:text-gray-900" to="#skills">Skills</Link>
          <Link className="mr-5 hover:text-gray-900" to="#project">Project</Link>
          <Link className="mr-5 hover:text-gray-900" to="#education">Education</Link>
        </nav>
        {(loggedIn) && <a className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:text-blue-400 rounded text-base mt-4 md:mt-0 mx-3" href={`/v/${loginUserRedux.loginUserId}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>{loginUserRedux.loginUserName}
        </a>}

        {!loggedIn ?
          <Link className="inline-flex items-center border-0 py-1 px-1 focus:outline-none hover:text-blue-400 rounded text-base mt-4 md:mt-0" to="/login">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Login
          </Link> :
          <Link className="inline-flex items-center border-0 py-1 px-1 focus:outline-none hover:text-blue-400 rounded text-base mt-4 md:mt-0" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
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
