import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuctionList, { loader as auctionLoader } from './features/auction/AuctionList'
import AuctionDetails, { loader as auctionDetailLoader } from './features/auction/AuctionDetails';
import CreateUser, { action as createUserAction } from './features/user/CreateUser';
import AuthenticateUser, { action as authenticateAction } from './features/user/AuthenticateUser';

import Home from './ui/Home';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';
import ProtectedRoute from './features/ProtectedRoute';

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
        path: '/create/user',
        element: <CreateUser />,
        action: createUserAction,
        errorElement: <Error />,
      },
      {
        path: '/login',
        element: <AuthenticateUser />,
        action: authenticateAction,
        errorElement: <Error />,
      },
      {
        element: <ProtectedRoute />, // Protect all nested routes
        children: [
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
