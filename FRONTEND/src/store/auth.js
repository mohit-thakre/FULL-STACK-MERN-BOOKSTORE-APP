import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: { isloggedin: false, role: "user" },
  reducers: {
    login(state) {
      state.isloggedin = true;
    },

    logout(state) {
      state.isloggedin = false;
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    changerole(state, action) {
      const role = action.payload;
      state.role = role;
    },
  },
});
export const authaction = authslice.actions;
export default authslice.reducer;
