import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './components/Root';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {

  const router = createBrowserRouter([
    {
      element: <Layout />,
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
