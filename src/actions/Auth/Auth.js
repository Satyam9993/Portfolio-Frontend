import axiosInstance from "../Axiosinstance";
import {LOGINUSERID, ENABLEEDIT} from '../type'

export const signinAction = async (body) => {
  const res = await axiosInstance.post("/auth/signin", body);
  return res;
};

export const VerifyOtpAction = (body) => async (dispatch) => {
  const res = await axiosInstance.post("/auth/verifyotp", body);
  if(res.data){
    dispatch({
      type: LOGINUSERID,
      payload: {userId: res.data.userId, userName: res.data.userName},
    });
  }
  return res;
};

export const loginuser = (body) => async (dispatch) => {
  const res = await axiosInstance.post("/auth/login", body);
  if(res.data){
    dispatch({
      type: LOGINUSERID,
      payload: {loginUserId: res.data.userId, loginUserName: res.data.userName},
    });
  }
  return res;
};

export const getloginData = () => async (dispatch) => {
  const res = await axiosInstance.get("/auth/login/data");
  if(res){
    dispatch({
      type: LOGINUSERID,
      payload: {loginUserName : res.data.loginUserName, loginUserId : res.data.loginUserId},
    });
  }
  return res;
};

export const changeEditSetting = (data) => (dispatch) => {
  if(data){
    dispatch({
      type: ENABLEEDIT,
      payload: data,
    });
  }
};

export const logout = () => (dispatch) => {
    dispatch({
      type: ENABLEEDIT,
      payload: false,
    });
    dispatch({
      type: LOGINUSERID,
      payload: {},
    });
};