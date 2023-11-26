import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loader: false,
  error: {},
  permission: false,
  videoDuration: 0,
};
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loader = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setA: (state, action) => {
      state.permission = action.payload;
    },
    setVideoDuration: (state, action) => {
      state.videoDuration = action.payload;
    },
  },
});

export const { setLoading, setError, setA, setVideoDuration } =
  commonSlice.actions;
export default commonSlice.reducer;
