import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearInfo } from "../features/user/userSlice"
import Username from '../features/user/Username'
import Button from './Button';

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { name } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(clearInfo())
    navigate("/")
  }

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Live Car Bidding System
      </Link>
      {name &&
        <div>
          <Link to="/" className="tracking-widest mr-4">Home</Link>
          <Link to="/auction/list" className="tracking-widest mr-4">Auctions</Link>
          <Button onClick={handleLogout} className="tracking-widest mr-4">LOGOUT</Button>
        </div>}
      <Username username={name} />
    </header>
  );
}

export default Header;
