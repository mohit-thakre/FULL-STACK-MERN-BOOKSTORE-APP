import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./auth";
const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});
export default store;
