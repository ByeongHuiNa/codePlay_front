// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { jwtDecode } from '../../../../../../node_modules/jwt-decode/build/cjs/index';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const token = jwtDecode(localStorage.getItem('token').slice(7));
  const temp = JSON.parse(JSON.stringify(menuItem.items));
  for (let i in temp) {
    temp[i].children = [];
  }
  const test = token.page_list;
  for (let i in temp) {
    for (let ids of test) {
      if (menuItem.items[i].children.filter((id) => id.id == ids).length != 0) {
        temp[i].children.push(menuItem.items[i].children.filter((id) => id.id == ids)[0]);
      }
    }
  }
  const navGroups = temp
    .filter((item) => item.children.length !== 0)
    .map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Fix - Navigation Group
            </Typography>
          );
      }
    });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
