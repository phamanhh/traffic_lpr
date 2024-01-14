import { CHANGE_PASSWORD, FIND_USERS, LOGIN, REGISTER } from "../src/api/services/userService"
import { getResponseChangePassword, getResponseLogin, getResponseRegister, getUsers } from "../src/redux/reducers/userSlice";

export const login = (loginForm) => {
  return async function loginThunk(dispatch) {
    try {
      let response = await LOGIN(loginForm);
      console.log(response);
      dispatch(getResponseLogin(response))
    } catch (error) {
      console.log(error);
    }
  }
}

export const signUp = (registerForm) => {
  return async function registerThunk(dispatch) {
    try {
      let response = await REGISTER(registerForm);
      console.log(response);
      dispatch(getResponseRegister(response));
    } catch (error) {
      console.log(error);
    }
  }
}

export const changePassword = (changePasswordForm) => {
  return async function changePasswordThunk(dispatch) {
    try {
      let response = await CHANGE_PASSWORD(changePasswordForm);
      console.log(response);
      dispatch(getResponseChangePassword(response))
    } catch (error) {
      console.log(error);
    }
  }
}

export const getListUsers = (data) => {
  return async function getListUsersThunk(dispatch) {
    try {
      let response = await FIND_USERS(data);
      console.log(response);
      dispatch(getUsers(response))
    } catch (error) {
      console.log(error);
    }
  }
}