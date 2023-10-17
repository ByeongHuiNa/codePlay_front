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

// ==============================|| MENU ITEMS - user ||============================== //

const userMenu = {
  id: 'group-user-menu',
  title: '사용자메뉴',
  type: 'group',
  children: [
    {
      id: 'Calendar',
      title: '캘린더',
      type: 'item',
      url: '/calendar',
      icon: icons.CalendarOutlined,
      breadcrumbs: false
    },
    {
      id: 'userAttendanceTotal',
      title: '근태현황조회',
      type: 'item',
      url: '/userAttendanceTotal',
      icon: icons.PieChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'UserAttendance',
      title: '사용자 출/퇴근',
      type: 'item',
      url: '/userattendance',
      icon: icons.CarOutlined,
      breadcrumbs: false
    },
    {
      id: 'UserLeave',
      title: '사용자 휴가',
      type: 'item',
      url: '/userleave',
      icon: icons.SmileOutlined,
      breadcrumbs: false
    }
  ]
};

export default userMenu;
