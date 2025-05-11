import { createSlice} from "@reduxjs/toolkit";
import { userLogin, userRegister } from "./authAction";




const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null
    },
    reducers:{
      logout:(state)=>{
            state.user=null;
            if(typeof window !== undefined){
                localStorage.removeItem("authToken")
            }
      },
      updatedUser:(state,action)=>{
        state.user=action.payload;
  }
    },
    extraReducers: (builder) => builder
    .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
    })
    .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
    })
    .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
    }).addCase(userRegister.pending,(state)=>{
        state.loading= true;
        state.user= null;
        state.error=null;
    }).addCase(userRegister.fulfilled,(state,action)=>{
        state.user=action.payload;
        state.loading=false;
        state.error=null;
    }).addCase(userRegister.rejected,(state,action)=>{
        state.error=action.payload;
        state.user=null;
        state.loading=false;
    })

})
export const {logout, updatedUser}= authSlice.actions;
export default authSlice.reducer;