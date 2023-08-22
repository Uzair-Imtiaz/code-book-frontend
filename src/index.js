import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/base/Layout';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import { MessageProvider } from './components/context/MessageContext';
import { TokenProvider } from './components/context/TokenContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profiles from './components/profile/Profiles';
import ProfileDetail from './components/profile/Profile-detail';
import Projects from './components/project/Projects';
import ProjectDetail from './components/project/Project-detail';

const App = () => {

  const router = createBrowserRouter([
    {
      element: <Layout />,
    },
    {
      path: '/',
      element: <Profiles />,
    },
    {
      path: '/profiles/:slug',
      element: <ProfileDetail />,
    },
    {
      path: '/projects',
      element: <Projects />,
    },
    {
      path: '/projects/:slug',
      element: <ProjectDetail />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <MessageProvider>
      <TokenProvider>
        <App />
      </TokenProvider>
    </MessageProvider>
  </StrictMode>,
);
