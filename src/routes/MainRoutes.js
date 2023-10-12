import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const Calendar = Loadable(lazy(() => import('pages/Calendar')));

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

const TotalAttendance = Loadable(lazy(() => import('pages/TotalAttendance')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// render - user information page
const UserInformation = Loadable(lazy(() => import('pages/UserInformation')));

//render - Main Manager page
const QueryUserInformation = Loadable(lazy(() => import('pages/QueryUserInformation')));

// render - user attendance
const UserAttendance = Loadable(lazy(()=>import('pages/UserAttendance')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'totalAttendance',
      element: <TotalAttendance />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    },
    {
      path: 'userInformation',
      element: <UserInformation />
    },
    {
      path: 'queryUserInformation',
      element: <QueryUserInformation />
    },
    {
      path: 'settingAccess',
      element: <UserInformation />
    },
    {
      path: 'settingAuthority',
      element: <UserInformation />
    },
    {
      path: 'calendar',
      element: <Calendar />
    },
    {  
      path: 'userattendance',
      element: <UserAttendance/>
    }
  ]
};

export default MainRoutes;
