import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    nickName: "",
    uid: "",
    accessToken: "",
    email: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.nickName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.nickName = "";
      state.uid = "";
      state.accessToken = "";
      state.email = "";
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
