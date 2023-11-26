import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./slices/user-slice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import commonSlice from "./slices/common-slice";

const persistConfig = {
  key: "root",
  storage,
};

const store = configureStore({
  reducer: {
    // user: persistReducer(persistConfig, userSlice),
    // classUpload: classUploadSlice,
    common: commonSlice,
    // cart: cartSlice,
  },
});

export const persistor = persistStore(store);

export default store;
