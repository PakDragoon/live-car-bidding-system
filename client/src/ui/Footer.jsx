import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Live Car Bidding System
      </Link>
      <div>livecarauction.com © 2024</div>
    </footer>
  );
}

export default Footer;
