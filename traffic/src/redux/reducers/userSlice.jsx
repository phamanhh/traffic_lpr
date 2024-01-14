import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginResponse: null,
  registerResponse: null,
  changePasswordResponse: null,
  users: []
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getResponseLogin: (state, action) => {
      state.loginResponse = action.payload;
    },
    getResponseRegister: (state, action) => {
      state.registerResponse = action.payload;
    },
    getResponseChangePassword: (state, action) => {
      state.changePasswordResponse = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    }
  }
})

export default userSlice.reducer;
export const { getResponseLogin, getResponseRegister, getResponseChangePassword, getUsers } = userSlice.actions;