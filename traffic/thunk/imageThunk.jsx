import { FIND_VIOLATION, FIND_VIOLATION_DATE, LOG_INFO, REG_IMAGE, REG_VIDEO } from "../src/api/services/imageService"
import { getLogInfo, getPostImageResult, getViolation, getViolationDate } from "../src/redux/reducers/imageSlice";

export const regImage = (data) => {
  return async function regImageThunk(dispatch) {
    try {
      let response = await REG_IMAGE(data);
      console.log(response);
      dispatch(getPostImageResult(response));
    } catch (error) {
      console.log(error);
    }
  }
}

export const regVideo = (data) => {
  return async function reVideoThunk(dispatch) {
    try {
      let response = await REG_VIDEO(data);
      console.log(response);
      dispatch(getPostImageResult(response));
    } catch (error) {
      console.log(error);
    }
  }
}

export const logInfo = (data) => {
  return async function logInfoThunk(dispatch) {
    try {

      let response = await LOG_INFO(data);
      console.log("in");
      console.log("response ------->", response);
      dispatch(getLogInfo(response));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getViolationInfo = (data) => {
  return async function getViolationInfoThunk(dispatch) {
    try {
      let response = await FIND_VIOLATION(data);
      console.log('thunk ------->',response);
      dispatch(getViolation(response));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getViolationStatistic = (data) => {
  return async function getViolationStatisticThunk(dispatch) {
    try {
      let response = await FIND_VIOLATION_DATE(data);
      dispatch(getViolationDate(response));
    } catch (error) {
      console.log(error);
    }
  }
}