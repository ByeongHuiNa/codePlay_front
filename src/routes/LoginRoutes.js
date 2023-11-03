import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/LoginPage')));
const AuthRegister = Loadable(lazy(() => import('pages/Registration')));
const ForgotPassword = Loadable(lazy(() => import('pages/ForgotPassword')));


// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login-form',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'forgotPassword',
      element: <ForgotPassword />
    }
  ]
};

export default LoginRoutes;
