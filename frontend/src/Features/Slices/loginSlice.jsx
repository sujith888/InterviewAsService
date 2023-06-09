import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../api/authapi";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const postLogin = createAsyncThunk("login", async (values) => {
  try {
    const response = await myAxios.post("/login", values);
    return response;
  } catch (error) {
   
    toast.error(error?.response?.data?.message)
    throw error;
  }
});

export const googleSignIn = createAsyncThunk(
  'users/googleSignIn',
  async (payload) => {
    try {
      const response = await myAxios.post('/sign_in_with_google', payload);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


const initialState = {
  loginDetails: [],
  refreshToken: null,
  accessToken: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {})
      .addCase(postLogin.fulfilled, (state, action) => {
        console.log(action?.payload);
        console.log("action");
        state.loginDetails = action?.payload?.data?.loggedInDetails;
        state.refreshToken =
          action?.payload?.data?.loggedInDetails?.refreshToken;
        state.accessToken = action?.payload?.data?.loggedInDetails?.accessToken;
      })
      .addCase(googleSignIn.fulfilled,(state,action)=>{
        console.log(action?.payload);
        console.log("action googglr sign in");
        state.loginDetails = action?.payload?.data?.loggedInDetails;
        state.refreshToken =
          action?.payload?.data?.loggedInDetails?.refreshToken;
        state.accessToken = action?.payload?.data?.loggedInDetails?.accessToken;
      })
      .addCase(postLogin.rejected, (state, action) => {});
  },
}); 

export   const  {logout }= loginSlice.actions
export default loginSlice.reducer;
