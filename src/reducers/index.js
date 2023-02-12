import { combineReducers } from "@reduxjs/toolkit";
import Loginuser from './loginuser'
import User from './User'

// import { combineReducers } from 'redux';


// import counterReducer from './Counter/counter.reducer';


const rootReducer = combineReducers({
    loginuser : Loginuser,
    Userdata : User
});

export default rootReducer;