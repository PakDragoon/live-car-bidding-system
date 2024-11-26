import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuctionList, { loader as auctionLoader } from './features/auction/AuctionList'

import Home from './ui/Home';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';
import AuctionDetails, { loader as auctionDetailLoader } from './features/auction/AuctionDetails';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/auction/list',
        element: <AuctionList />,
        loader: auctionLoader,
        errorElement: <Error />,
      },
      {
        path: '/auction/:id',
        element: <AuctionDetails />,
        loader: auctionDetailLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
