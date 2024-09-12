import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice.js";

export const combinedReducers = combineReducers({
    auth: authSlice,
})