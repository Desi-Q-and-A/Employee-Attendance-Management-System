import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import Helper from "../helper/axiosHelper";
const baseUrl = Helper.baseUrl();

const initialState = {
  firstSignUp: {},
  secSignUp: {},
  searchValue: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    firstSignUp: (state, action) => {
      state.firstSignUp = action.payload;
    },
    secSignUp: (state, action) => {
      state.secSignUp = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { firstSignUp, secSignUp, getReasonList,setSearchValue } = userSlice.actions;

export default userSlice.reducer;

export const getReasonListCb =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "user/reasons").then(
      (response) => response.data
    );
    callback(result);
  };

export const userRegisterCb =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(baseUrl + "user/register", data).then(
      (response) => response.data
    );
    callback(result);
  };

export const userLoginCb =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(baseUrl + "aaa/auth/signIn", data).then(
      (response) => response.data
    );
    callback(result);
  };

export const userForgotPassCb =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(
      baseUrl + "user/forgotPassword",
      data
    ).then((response) => response.data);
    callback(result);
  };

export const userForgotPassSecCb =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(
      baseUrl + "user/confirmPassword",
      data
    ).then((response) => response.data);
    callback(result);
  };

export const accountPasswordCb =
  (params, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(
      baseUrl + `user/resetPassword/${params}`
    ).then((response) => response.data);
    callback(result);
  };

export const accountActivationCb =
  (params, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(
      baseUrl + `user/activate_account/${params}`
    ).then((response) => response.data);
    callback(result);
  };

export const educatorSignupCb =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(
      baseUrl + "educator/signUpFrom",
      data
    ).then((response) => response.data);
    callback(result);
  };

export const educatorRegisterCb =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.formData(
      baseUrl + "educator/signUpFrom",
      data
    ).then((response) => response.data);
    callback(result);
  };

export const blogListCb =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "blog/s").then(
      (response) => response.data
    );
    callback(result);
  };

export const blogViewCb =
  (data, callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.postData(baseUrl + "blog/detail", data).then(
      (response) => response.data
    );
    callback(result);
  };

export const CategoryList =
  (callback = () => {}) =>
  async (dispatch) => {
    var result = await Helper.getData(baseUrl + "categories").then(
      (response) => response.data
    );
    callback(result);
  };

  export const ContactUs =( data , callback =()=>{})=>
    async()=>{
      let userData = await Helper.postData(baseUrl + 'user/contact_us',data).then(res=> res.data)
      callback(userData)
    }
  export const Active_session_list_in_my_courses =( data , callback =()=>{})=>
    async()=>{
      let userData = await Helper.postData(baseUrl + 'course/session/active_session_list',data).then(res=> res.data)
      callback(userData)
    }
  
  export const User_give_rating_and_reviews =( data , callback =()=>{})=>
    async()=>{
      let userData = await Helper.postData(baseUrl + 'user/give_rating_and_reviews',data).then(res=> res.data)
      callback(userData)
    }
  

  export const User_existing_rating_and_reviews =( courseId , callback =()=>{})=>
    async()=>{
      let userData = await Helper.postData(baseUrl + 'user/existing_rating_and_reviews',courseId).then(res=> res.data)
      callback(userData)
    }
  