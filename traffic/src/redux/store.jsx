import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice';
import imageSlice from './reducers/imageSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    image: imageSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export default store;