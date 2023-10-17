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

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const projectMenu = {
  id: 'group-project-menu',
  title: 'projectMenu',
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
      id: 'seeAllAttendance',
      title: '근태현황조회(담당자)',
      type: 'item',
      url: '/seeAllAttendance',
      icon: icons.PieChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'seeUserAttendance',
      title: '사용자별근태현황조회(담당자)',
      type: 'item',
      url: '/seeUserAttendance',
      icon: icons.PieChartOutlined,
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
    },
    {
      id: 'approvalAttendance',
      title: '전자결재',
      type: 'item',
      url: '/approvalattendance',
      icon: icons.ReconciliationOutlined,
      breadcrumbs: false
    },
    {
      id: 'modifyAttendance',
      title: '근태현황수정',
      type: 'item',
      url: '/modifyattendance',
      icon: icons.ReconciliationOutlined,
      breadcrumbs: false
    }
  ]
};

export default projectMenu;
