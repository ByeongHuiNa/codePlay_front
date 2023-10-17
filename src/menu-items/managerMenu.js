// assets
import {
  CalendarOutlined,
  CarOutlined,
  SmileOutlined,
  PieChartOutlined,
  SolutionOutlined,
  SecurityScanOutlined,
  FileProtectOutlined,
  TeamOutlined,
  FormOutlined,
  ReconciliationOutlined
} from '@ant-design/icons';

// icons
const icons = {
  CalendarOutlined,
  CarOutlined,
  SmileOutlined,
  PieChartOutlined,
  SolutionOutlined,
  SecurityScanOutlined,
  FileProtectOutlined,
  TeamOutlined,
  FormOutlined,
  ReconciliationOutlined
};

// ==============================|| MENU ITEMS - manager ||============================== //

const managerMenu = {
  id: 'group-manager-menu',
  title: '관리자메뉴',
  type: 'group',
  children: [
    {
      id: 'queryUserInformation',
      title: '사용자조회',
      type: 'item',
      url: '/queryUserInformation',
      icon: icons.TeamOutlined,
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
      id: 'settingAccess',
      title: '접근관리',
      type: 'item',
      url: '/settingAccess',
      icon: icons.FileProtectOutlined,
      breadcrumbs: false
    },
    {
      id: 'settingAttendancePolicy',
      title: '출퇴근시간관리',
      type: 'item',
      url: '/settingAttendancePolicy',
      icon: icons.FormOutlined,
      breadcrumbs: false
    },
  ]
};

export default managerMenu;
