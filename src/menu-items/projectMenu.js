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
      id: 'totalAttendance',
      title: '근태현황조회',
      type: 'item',
      url: '/totalAttendance',
      icon: icons.PieChartOutlined,
      breadcrumbs: false
    }
  ]
};

export default projectMenu;
