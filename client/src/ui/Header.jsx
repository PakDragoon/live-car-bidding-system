import { Link } from 'react-router-dom';
const loggedIn = true

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Live Car Bidding System
      </Link>
      {loggedIn ? (
        <div>
          <Link to="/" className="tracking-widest mr-4">Home</Link>
          <Link to="/auction/list" className="tracking-widest mr-4">Auctions</Link>
          <Link to="/logout" className="tracking-widest mr-4">Logout</Link>
        </div>
      ) : (
        <div>
          <Link to="/login" className="tracking-widest mr-4">Login</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
