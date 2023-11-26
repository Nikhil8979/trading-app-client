import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
  isAuthenticated: false,
  token: null,
  masterToken: null,
  permission: false,
  userData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.token = action.payload.token;
      state.masterToken = action.payload.masterToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userDetails = null;
      state.isAuthenticated = false;
      state.token = null;
      state.masterToken = null;
    },
    updateUser: (state, action) => {
      state.userDetails = action.payload;
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    },
    setVisitUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, updateUser, setPermission, setVisitUserData } =
  userSlice.actions;

export default userSlice.reducer;
