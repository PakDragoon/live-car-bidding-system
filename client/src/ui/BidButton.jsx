import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { placeBid } from '../services/apiAuction';

const BidButton = ({ auctionId }) => {
  const queryClient = useQueryClient();
  const [bidAmount, setBidAmount] = useState('');

  const mutation = useMutation((amount) => placeBid(auctionId, amount), {
    onSuccess: () => queryClient.invalidateQueries(['auction', auctionId]),
  });

  const handleBid = () => {
    mutation.mutate(Number(bidAmount));
    setBidAmount('');
  };

  return (
    <div>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter bid amount"
      />
      <button onClick={handleBid} disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Placing Bid...' : 'Place Bid'}
      </button>
    </div>
  );
};

export default BidButton;
