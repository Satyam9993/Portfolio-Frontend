import axiosInstance from "../Axiosinstance";
import {USERDATA} from '../type'

export const getUserDataByName = (username) => async (dispatch) => {
    const res = await axiosInstance.get(`/user/${username}`);
    if(res.data){
        dispatch({
          type: USERDATA,
          payload: res.data.user
        });
    }
    return res;
};

export const updateUserData = (id) => async (dispatch) => {
  const res = await axiosInstance.get(`/user/data/${id}`);
  if(res.data){
      dispatch({
        type: USERDATA,
        payload: res.data.user
      });
  }
  return res;
};
