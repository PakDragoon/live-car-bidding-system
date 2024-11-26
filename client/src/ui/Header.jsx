import { Link } from 'react-router-dom';
import Username from '../features/user/Username'
const loggedIn = true

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Live Car Bidding System
      </Link>
      {loggedIn &&
        <div>
          <Link to="/" className="tracking-widest mr-4">Home</Link>
          <Link to="/auction/list" className="tracking-widest mr-4">Auctions</Link>
          <Link to="/" className="tracking-widest mr-4">Logout</Link>
        </div>}
      <Username />
    </header>
  );
}

export default Header;
