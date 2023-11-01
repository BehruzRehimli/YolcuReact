 import { configureStore } from "@reduxjs/toolkit";
 import loginReducer from "./control/loginSlice";
 import rentReducer from './control/rentSlice'

 export const store=configureStore({
    reducer:{
        login: loginReducer,
        rent: rentReducer,
    }
 })