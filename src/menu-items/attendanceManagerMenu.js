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

// ==============================|| MENU ITEMS - attendance manager ||============================== //

const attendanceManagerMenu = {
  id: 'group-attendanceManager-menu',
  title: '근태담당자메뉴',
  type: 'group',
  children: [
    {
      id: 'seeAllAttendance',
      title: '근태현황조회(담당자)',
      type: 'item',
      url: '/seeAllAttendance',
      icon: icons.PieChartOutlined,
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

export default attendanceManagerMenu;
