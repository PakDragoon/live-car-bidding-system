import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { WebSocketContext } from '../../services/WebSocketContext';

const AuctionDetails = () => {
  const { id } = useParams();
  const { ws, sendMessage } = useContext(WebSocketContext);
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    // Fetch auction details and initial bids
    fetch(`http://localhost:8080/auction/${id}`) // Replace with your backend API
      .then((res) => res.json())
      .then((data) => setAuction(data))
      .catch((err) => console.error(err));

    // Listen for WebSocket messages
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'NEW_BID' && message.auctionId === id) {
        setBids((prevBids) => [...prevBids, message.bid]);
      }
    };

    return () => {
      ws.onmessage = null; // Clean up WebSocket listener
    };
  }, [ws, id]);

  const placeBid = () => {
    if (bidAmount) {
      sendMessage({
        type: 'PLACE_BID',
        auctionId: id,
        amount: parseFloat(bidAmount),
      });
      setBidAmount(''); // Clear input field
    }
  };

  return (
    <div>
      <h1>{auction?.name}</h1>
      <h2>Current Highest Bid: {bids[bids.length - 1]?.amount || 'No bids yet'}</h2>
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>{bid.username}: ${bid.amount}</li>
        ))}
      </ul>
      <div>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid"
        />
        <button onClick={placeBid}>Place Bid</button>
      </div>
    </div>
  );
};

export default AuctionDetails;
