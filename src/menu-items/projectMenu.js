// assets
import {
  CalendarOutlined,
  SolutionOutlined,
  SecurityScanOutlined,
  FileProtectOutlined,
  TeamOutlined,
  FormOutlined
} from '@ant-design/icons';

// icons
const icons = {
  CalendarOutlined,
  SolutionOutlined,
  SecurityScanOutlined,
  FileProtectOutlined,
  TeamOutlined,
  FormOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const projectMenu = {
  id: 'group-project-menu',
  title: 'projectMenu',
  type: 'group',
  children: [
    {
      id: 'Calendar',
      title: 'Calendar',
      type: 'item',
      url: '/calendar',
      icon: icons.CalendarOutlined,
      breadcrumbs: false
    },
    {
      id: 'userInformation',
      title: '사용자정보',
      type: 'item',
      url: '/userInformation',
      icon: icons.SolutionOutlined,
      breadcrumbs: false
    },
    {
      id: 'queryUserInformation',
      title: '사용자조회',
      type: 'item',
      url: '/queryUserInformation',
      icon: icons.TeamOutlined,
      breadcrumbs: false
    },
    {
      id: 'settingAccess',
      title: '접근관리',
      type: 'item',
      url: '/settingAccess',
      icon: icons.FileProtectOutlined,
      breadcrumbs: false
    },
    {
      id: 'settingAuthority',
      title: '권한관리',
      type: 'item',
      url: '/settingAuthority',
      icon: icons.SecurityScanOutlined,
      breadcrumbs: false
    },
    {
      id: 'settingAttendancePolicy',
      title: '출퇴근시간관리',
      type: 'item',
      url: '/settingAttendancePolicy',
      icon: icons.FormOutlined,
      breadcrumbs: false
    }
  ]
};

export default projectMenu;
