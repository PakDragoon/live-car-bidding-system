import { Link, redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearInfo } from "../features/user/userSlice"
import Username from '../features/user/Username'
import LinkButton from './LinkButton';

function Header() {
  const dispatch = useDispatch()
  const { email, name } = useSelector((state) => state.user)
  const loggedIn = email ? true : false

  const handleLogout = () => {
    dispatch(clearInfo())
    redirect("/")
  }

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Live Car Bidding System
      </Link>
      {loggedIn &&
        <div>
          <Link to="/" className="tracking-widest mr-4">Home</Link>
          <Link to="/auction/list" className="tracking-widest mr-4">Auctions</Link>
          <LinkButton onClick={handleLogout} className="tracking-widest mr-4">Logout</LinkButton>
        </div>}
      <Username username={name} />
    </header>
  );
}

export default Header;
