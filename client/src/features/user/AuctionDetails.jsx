import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAuctionDetails } from '../../services/apiAuction';
import BidButton from '../../ui/BidButton';
import { useParams } from 'react-router-dom';
import useWebSocket from '../../services/useWebSocket';

const AuctionDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [realTimeBid, setRealTimeBid] = useState(null);

  const { data, isLoading, error } = useQuery(['auction', id], () =>
    fetchAuctionDetails(id)
  );

  // WebSocket integration for real-time updates
  useWebSocket((message) => {
    if (message.auctionId === id) {
      setRealTimeBid(message.highestBid);
      queryClient.invalidateQueries(['auction', id]); // Refresh data
    }
  });

  if (isLoading) return <div>Loading auction details...</div>;
  if (error) return <div>Error loading auction details.</div>;

  return (
    <div>
      <h1>{data.carModel} Auction</h1>
      <p>
        Current Highest Bid: $
        {realTimeBid || data.highestBid}
      </p>
      <BidButton auctionId={id} />
    </div>
  );
};

export default AuctionDetails;
