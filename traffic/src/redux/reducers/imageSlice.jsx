import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: null,
  info: null,
  violation: null,
  violationDate: null,
}

const imageSlice = createSlice({
  name: 'image',
  initialState: initialState,
  reducers: {
    getPostImageResult: (state, action) => {
      state.result = action.payload;
    },
    getLogInfo: (state, action) => {
      state.info = action.payload;
    },
    getViolation: (state, action) => {
      state.violation = action.payload;
    },
    getViolationDate: (state, action) => {
      state.violationDate = action.payload;
    }
  }
})

export default imageSlice.reducer;
export const { getPostImageResult, getLogInfo, getViolation, getViolationDate } = imageSlice.actions;
