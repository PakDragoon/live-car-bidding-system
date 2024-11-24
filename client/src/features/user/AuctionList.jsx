import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAuctions } from '../../services/apiAuction';
import { Link } from 'react-router-dom';

const AuctionList = () => {
  const { data, isLoading, error } = useQuery(['auctions'], fetchAuctions);

  if (isLoading) return <div>Loading auctions...</div>;
  if (error) return <div>Error loading auctions.</div>;

  return (
    <div>
      <h1>Ongoing Auctions</h1>
      <ul>
        {data.map((auction) => (
          <li key={auction.id}>
            <Link to={`/auction/${auction.id}`}>
              {auction.carModel} - Current Bid: ${auction.highestBid}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
