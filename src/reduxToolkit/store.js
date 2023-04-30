import { configureStore } from '@reduxjs/toolkit';
import registrationkitSlice from './Slices/registrationkitSlice';


export const store = configureStore({
  reducer: {
    registration: registrationkitSlice,
  },
});
