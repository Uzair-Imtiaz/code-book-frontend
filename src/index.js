import React, { StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Login from './components/authentication/Login/Login';
import Register from './components/authentication/Register/Register';
import Layout from './components/base/Layout';
import NotFound from './components/base/NotFound';
import { MessageProvider, useMessage } from './components/context/MessageContext';
import ProfileDetail from './components/profile/Profile-Detail/Profile-detail';
import ProfileForm from './components/profile/Profile-Form/Profile-form';
import Profiles from './components/profile/Profiles/Profiles';
import ProjectDetail from './components/project/Project-Detail/Project-detail';
import ProjectForm from './components/project/Project-Form/Project-form';
import Projects from './components/project/Projects/Projects';

/**
 * The main application component.
 * @returns {JSX.Element} The JSX element representing the application.
 */
const App = () => {
  const { message } = useMessage();

  useEffect(() => {
    /**
     * Display a toast message when a message is available.
     */
    if (message) {
      toast(message.body, {
        type: message.type,
        progress: undefined,
      });
    }
  }, [message]);

  const router = createBrowserRouter([
    {
      element: <Layout />,
    },
    {
      path: '/',
      element: <Profiles />,
    },
    {
      path: '/profiles',
      element: <Profiles />,
    },
    {
      path: '/profiles/:slug',
      element: <ProfileDetail />,
    },
    {
      path: '/edit-profile',
      element: <ProfileForm />,
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
      path: '/add-project',
      element: <ProjectForm />,
    },
    {
      path: '/edit-project',
      element: <ProjectForm />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <NotFound />,
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </MessageProvider>
  </StrictMode>,
);
