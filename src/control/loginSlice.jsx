import { createSlice} from "@reduxjs/toolkit";

const initialState={
    isLogin:false,
    token:localStorage.getItem("YolcuToken"),
    adminToken:localStorage.getItem("YolcuAdmin"),
    username: "",
    adminUsername:"",
    adminLogin:false
};

const loginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        setUsername: (state,action)=>{
            state.username=action.payload;
        },
        logedYes:(state)=>{
            state.isLogin=true;
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        logedNo:(state)=>{
            state.isLogin=false;
        },
        setAdminToken:(state,action)=>{
            state.adminToken=action.payload
        },
        setAdminUsername:(state,action)=>{
            state.adminUsername=action.payload
        },
        adminLogedYes:(state)=>{
            state.adminLogin=true
        },     
        adminLogedNo:(state)=>{
            state.adminLogin=false
        }

    }
});

export const {setUsername,logedYes,setToken,logedNo,setAdminToken,setAdminUsername,adminLogedNo,adminLogedYes} =loginSlice.actions;
export default loginSlice.reducer;