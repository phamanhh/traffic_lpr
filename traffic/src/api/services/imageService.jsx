import instance from ".."

export const REG_IMAGE = async (data) => {
  let response = await instance.post('/reg/image', data);
  return response.data
} 

export const REG_VIDEO = async (data) => {
  let response = await instance.post('/reg/video', data);
  return response.data
}

export const LOG_INFO = async (data) => { 
  console.log("api");
  let response = await instance.post('/log/info/', data);
  return response.data;
}

export const FIND_VIOLATION = async (data) => {
  let response = await instance.post('/vi-pham/check/', data);
  return response.data;
}

export const FIND_VIOLATION_DATE = async (data) => {
  let response = await instance.post('/vi-pham/thong-ke/', data);
  return response.data;
}