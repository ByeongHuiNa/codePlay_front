import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const CalendarPage = Loadable(lazy(() => import('pages/CalendarPage')));
// render - UserAttendanceTotal page
const UserAttendanceTotal = Loadable(lazy(() => import('pages/UserAttendanceTotal')));
// render - SeeAllAttendance page
const SeeAllAttendance = Loadable(lazy(() => import('pages/SeeAllAttendance')));
// render - SeeUserAttendance page
const SeeUserAttendance = Loadable(lazy(() => import('pages/SeeUserAttendance')));
//render - Main page
const Main = Loadable(lazy(() => import('pages/Main')));

// render - utilities

// render - user information page
const UserInformation = Loadable(lazy(() => import('pages/UserInformation')));
const UserInformationModify = Loadable(lazy(() => import('pages/UserInformationModify')));

//render - Main Manager page
const QueryUserInformation = Loadable(lazy(() => import('pages/QueryUserInformation')));
const SettingAccess = Loadable(lazy(() => import('pages/SettingAccess')));
const SettingAuthority = Loadable(lazy(() => import('pages/SettingAuthority')));
const SettingAttendancePolicy = Loadable(lazy(() => import('pages/SettingAttendancePolicy')));

// render - user attendance
const UserAttendance = Loadable(lazy(() => import('pages/UserAttendance')));
// render - user leave
const UserLeave = Loadable(lazy(() => import('pages/UserLeave')));
// render - approval attendance
const ApprovalAttendance = Loadable(lazy(() => import('pages/ApprovalAttendance')));
// render - modify attendance
const ModifyAttendance = Loadable(lazy(() => import('pages/ModifyAttendance')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Main />
    },
    {
      path: 'userAttendanceTotal',
      element: <UserAttendanceTotal />
    },
    {
      path: 'seeAllAttendance',
      element: <SeeAllAttendance />
    },
    {
      path: 'seeUserAttendance',
      element: <SeeUserAttendance />
    },
    {
      path: 'main',
      element: <Main />
    },
    {
      path: 'userInformation',
      element: <UserInformation />
    },
    {
      path: 'userInformationModify',
      element: <UserInformationModify />
    },
    {
      path: 'queryUserInformation',
      element: <QueryUserInformation />
    },
    {
      path: 'settingAccess',
      element: <SettingAccess />
    },
    {
      path: 'settingAuthority',
      element: <SettingAuthority />
    },
    {
      path: 'calendar',
      element: <CalendarPage />
    },
    {
      path: 'userattendance',
      element: <UserAttendance />
    },
    {
      path: 'userleave',
      element: <UserLeave />
    },
    {
      path: 'approvalattendance',
      element: <ApprovalAttendance />
    },
    {
      path: 'settingAttendancePolicy',
      element: <SettingAttendancePolicy />
    },
    {
      path: 'modifyattendance',
      element: <ModifyAttendance />
    }
  ]
};

export default MainRoutes;
