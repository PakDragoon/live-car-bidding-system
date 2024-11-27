import { useSelector } from 'react-redux';
import LinkButton from './Button';

function Home() {
  const { userId } = useSelector((state) => state.user)

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        Car Auction System
        <br />
        <span className="text-yellow-500">
          Join the live bidding for car auction.
        </span>
      </h1>

      {userId ? <LinkButton to="/auction/list">All Auctions</LinkButton> : (
        <div className='flex flex-col justify-center gap-y-2.5'>
          <LinkButton to="/login" type="primary">Login</LinkButton>
          <LinkButton to="/create/user" type="secondary">Create User</LinkButton>
        </div>
      )}
    </div>
  );
}

export default Home;
