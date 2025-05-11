import authReducer from "@/redux/auth/authSlice"
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer= combineReducers({
    auth:authReducer,
})
export default rootReducer;