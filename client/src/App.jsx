import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WebSocketProvider from './services/WebSocketContext';

import Home from './ui/Home';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';
import AuctionList from './features/auction/AuctionList';
import AuctionDetails from './features/auction/AuctionDetails';

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
        // loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/auction/:id',
        element: <AuctionDetails />,
        // loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <WebSocketProvider>
      <RouterProvider router={router} />
    </WebSocketProvider>
  );
}

export default App;
