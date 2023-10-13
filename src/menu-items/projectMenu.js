// assets
import { CalendarOutlined, CarOutlined, SmileOutlined } from '@ant-design/icons';

// icons
const icons = {
  CalendarOutlined,
  CarOutlined,
  SmileOutlined
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
  ]
};

export default projectMenu;
