import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Fetch list of auctions (use axios or fetch here for initial data)
    fetch('http://localhost:8080/auctions') // Replace with your backend API
      .then((res) => res.json())
      .then((data) => setAuctions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Live Auctions</h1>
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id}>
            <Link to={`/auction/${auction.id}`}>{auction.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
