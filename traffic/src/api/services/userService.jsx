import instance from ".."

export const LOGIN = async (user) => {
  let response = await instance.post('/user/login', user)
  return response.data;
}

export const REGISTER = async (user) => {
  let response = await instance.post('/user/create-user', user)
  return response.data;
}

export const CHANGE_PASSWORD = async (changePassForm) => { 
  let response = await instance.post('/user/change-password', changePassForm)
  return response.data;
}

export const FIND_USERS = async (data) => {
  let response = await instance.post('/user/get-users/', data)
  return response.data;
}