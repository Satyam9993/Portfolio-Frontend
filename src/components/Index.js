import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Hero from "./Home/Home";
import Experience from "./Experience/Experience";
import Skill from "./Skills/Skill";
import Project from "./Project/Project";
import Education from "./Education/Education";
import Contact from "./Contact/Contact";
import { useLocation } from 'react-router-dom';
import Alert from "./Alert/Alert";
import { useState } from "react";
import { connect } from "react-redux";

import {getUserDataByName} from '../actions/UserData/userdata'
import {getloginData} from '../actions/Auth/Auth'


const Index = ({
  getUserDataByNameAction,
  getloginDataAction
}) => {
  const location = useLocation();
  const [alertShow, setAlertShow] = useState(false)
  const [alerttype, setAlerttype] = useState("warn")
  const [alertmsg, setAlertmsg] = useState("No MSG")
  useEffect(() => {
    const userName = location.pathname.slice(3)
    getUserDataByNameAction(userName)
    if(localStorage.getItem('authToken')){
      getloginDataAction()
    }
  }, [])

  const showAlert=(msg, type)=>{
    setAlerttype(type)
    setAlertmsg(msg)
    setAlertShow(true)
    setTimeout(() => {
      setAlertShow(false)
    }, 2500);
  }
  
  return (
    <>
      <div>
      {alertShow &&
      <Alert msg={alertmsg} type={alerttype} setAlertShow={setAlertShow}/>
      }
      </div>
      <Navbar showAlert={showAlert}/>
      <Hero showAlert={showAlert}/>
      <Skill  showAlert={showAlert}/>
      <Project showAlert={showAlert}/>
      <Experience showAlert={showAlert}/>
      <Education showAlert={showAlert}/>
      <Contact showAlert={showAlert}/>
    </>
  );
};


const mapDispatchToProps = {
  getUserDataByNameAction : getUserDataByName,
  getloginDataAction : getloginData
};

const mapStateToProps = (state) => {
  return {
    loginUserRedux: state?.loginuser?.LoginUser,
    UserdataRedux : state?.Userdata?.User
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
