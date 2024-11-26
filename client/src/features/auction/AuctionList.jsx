import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { fetchAuctions } from '../../services/apiAuction';

const AuctionList = () => {
  const auctions = useLoaderData()

  return (
    <div>
      <h1 className='mb-4'>Ongoing Live Auctions</h1>
      <ul>
        {auctions.map((auction, index) => (
          <li key={auction.id}>
            <Link to={`/auction/${auction.id}`}>{index + 1}. {auction.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function loader() {
  const data = await fetchAuctions();
  return data;
}

export default AuctionList;
