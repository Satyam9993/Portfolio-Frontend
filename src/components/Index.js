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
import {getloginData, changeEditSetting} from '../actions/Auth/Auth'


const Index = ({
  getUserDataByNameAction,
  getloginDataAction,
  changeEditSettingAction,
  loginUserRedux,
  UserdataRedux
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

  useEffect(() => {
    if(localStorage.getItem('authToken')){
      if(loginUserRedux.loginUserId && UserdataRedux._id){
        changeEditSettingAction(loginUserRedux.loginUserId === UserdataRedux._id);
      }
    }
  }, [loginUserRedux])

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
      <Navbar />
      <Hero />
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
  getloginDataAction : getloginData,
  changeEditSettingAction: changeEditSetting
};

const mapStateToProps = (state) => {
  return {
    loginUserRedux: state?.loginuser?.LoginUser,
    UserdataRedux : state?.Userdata?.User
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
