import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  auctions: [],
  status: 'idle',
  bid: 0,
  error: '',
};

const auctionSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    addBid(state, action) {
      state.bid = action.payload;
    },
  },
});

export const { addBid } = auctionSlice.actions;

export default auctionSlice.reducer;
