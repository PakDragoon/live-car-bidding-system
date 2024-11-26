import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLoaderData } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { fetchAuctionDetail } from '../../services/apiAuction';

const SOCKET_URL = 'ws://localhost:8000'

const AuctionDetails  = () => {
  const { id: { userId }} = useSelector((state) => state.user)
  const auction = useLoaderData()
  const { id } = useParams();
  const [bid, setBid] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL, {
    shouldReconnect: true,
    reconnectAttempts: 3,
    reconnectInterval: 5000
  });

  useEffect(() => {
    if (lastMessage !== null) setMessageHistory((prev) => prev.concat(lastMessage));
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const placeBid = useCallback(() => {
    if (bidAmount) {
      sendJsonMessage({
        type: 'PLACE_BID',
        auctionId: id,
        amount: parseFloat(bidAmount),
        userId
      });
      setBidAmount(''); // Clear input field
    }
  }, [bidAmount])

  useEffect(() => {
    fetch(`http://localhost:8000/auctions/bid/${id}`) // Replace with your backend API
      .then((res) => res.json())
      .then((data) => setBid(data?.bid))
      .catch((err) => console.error(err));

    return () => console.log("cleanup auction detail")
  }, [bidAmount]);

  return (
    <div>
      <div className='mb-4'>Connection Status: {connectionStatus}</div>
      <div>Auction Detail</div>
      <h1>Name: {auction?.title}</h1>
      <p>Description: {auction?.description}</p>
      {lastMessage ? <div>Last Bid Info: {lastMessage.data}</div> : null}
      <h2 className='mb-4'>Current Highest Bid: {bid || 'No bids yet'}</h2>
      <div>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid"
        />
        <button onClick={placeBid} disabled={readyState !== ReadyState.OPEN}>Place Bid</button>
      </div>
      <br></br>
      <div>Message History:</div>
      <ul>
        {messageHistory.map((message, idx) => (
          <div key={idx}>{message ? message.data : null}</div>
        ))}
      </ul>
    </div>
  );
};

export async function loader({ params }) {
  const data = await fetchAuctionDetail(params.id);
  return data;
}

export default AuctionDetails;
