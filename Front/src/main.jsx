import './index.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import PostView from './pages/PostView/PostView.jsx';
import Message from './pages/Message/Message.jsx';
import { UserProvider } from './Components/UserContext/UserContext.jsx';

const router = createBrowserRouter([
  {
    path: "/Register",
    element: <Register />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    )
  },
  {
    path: "/post",
    element: (
      <PrivateRoute>
        <PostView />
      </PrivateRoute>
    )
  },
  {
    path: "/message",
    element: (
      <PrivateRoute>
        <Message />
      </PrivateRoute>
    )
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
