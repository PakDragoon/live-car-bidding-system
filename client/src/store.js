import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from './features/auction/auctionSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    auction: auctionReducer,
    user: userReducer,
  },
});

export default store;
