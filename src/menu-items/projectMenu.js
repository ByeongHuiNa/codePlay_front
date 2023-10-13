// assets
import { CalendarOutlined, PieChartOutlined } from '@ant-design/icons';

// icons
const icons = {
  CalendarOutlined,
  PieChartOutlined
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
    }
  ]
};

export default projectMenu;
