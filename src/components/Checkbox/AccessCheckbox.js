/* eslint-disable no-unused-vars */
import { Checkbox, FormControlLabel, Stack } from '@mui/material/index';
import { useAccessPage, useTabState } from 'store/module';
import { Divider, IconButton, ListItemButton, Typography } from '../../../node_modules/@mui/material/index';

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
  ReconciliationOutlined,
  HomeOutlined
} from '@ant-design/icons';

const iconsItems = [
  {
    id: 1,
    icon: <HomeOutlined />
  },
  {
    id: 2,
    icon: <CalendarOutlined />
  },
  {
    id: 3,
    icon: <PieChartOutlined />
  },
  {
    id: 4,
    icon: <CarOutlined />
  },
  {
    id: 5,
    icon: <SmileOutlined />
  },
  {
    id: 14,
    icon: <CarOutlined />
  },
  {
    id: 6,
    icon: <PieChartOutlined />
  },
  {
    id: 8,
    icon: <ReconciliationOutlined />
  },
  {
    id: 9,
    icon: <ReconciliationOutlined />
  },
  {
    id: 10,
    icon: <TeamOutlined />
  },
  {
    id: 11,
    icon: <SecurityScanOutlined />
  },
  {
    id: 12,
    icon: <FileProtectOutlined />
  },
  {
    id: 13,
    icon: <FormOutlined />
  }
];

const AccessCheckbox = () => {
  const { accessPage, setAccessPage } = useAccessPage();
  const { tab } = useTabState();

  const handleChange = (page_default_role_level, page_no) => {
    const pre = accessPage[page_default_role_level].find((pre) => pre.page_no == page_no).checked;
    accessPage[page_default_role_level].find((pre) => pre.page_no == page_no).checked = !pre;
    setAccessPage(accessPage);
  };
  const handleParentChange = (page_default_role_level) => {
    const pre =
      accessPage[page_default_role_level].reduce((pre, cur) => {
        return pre + cur.checked;
      }, 0) == accessPage[page_default_role_level].length;
    accessPage[page_default_role_level].forEach((element) => {
      element.checked = !pre;
    });
    setAccessPage(accessPage);
  };
  return (
    <>
      {Object.keys(accessPage).length > 0 &&
        Object.keys(tab).length > 0 &&
        Object.keys(accessPage).map((page_default_role_level) => {
          return (
            <Stack key={page_default_role_level} mb={2} sx={{ height: '2rem' }}>
              <ListItemButton style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                <FormControlLabel
                  label={
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {`${tab.find((item) => item.id == page_default_role_level).name} 페이지 전체`}
                    </Typography>
                  }
                  control={
                    <Checkbox
                      checked={
                        accessPage[page_default_role_level].reduce((pre, cur) => {
                          return pre + cur.checked;
                        }, 0) === accessPage[page_default_role_level].length
                      }
                      indeterminate={
                        !(
                          accessPage[page_default_role_level].reduce((pre, cur) => {
                            return pre + cur.checked;
                          }, 0) === accessPage[page_default_role_level].length ||
                          accessPage[page_default_role_level].reduce((pre, cur) => {
                            return pre + cur.checked;
                          }, 0) === 0
                        )
                      }
                      onChange={() => handleParentChange(page_default_role_level)}
                    />
                  }
                />
              </ListItemButton>
              <Divider sx={{ border: 1.5, borderColor: 'divider', mb: 1, mt: 1 }}></Divider>
              <Stack direction="column" spacing={2}>
                {accessPage[page_default_role_level].map((page) => {
                  return (
                    <Stack key={page.page_no} sx={{ height: '2rem' }}>
                      <ListItemButton style={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                        <FormControlLabel
                          label={
                            <>
                              <Typography sx={{ fontSize: '1.1rem' }}>
                                <IconButton sx={{ fontSize: '1.4rem', mb: 0.5, mr: 0.5, pointerEvents: 'none' }}>
                                  {iconsItems.find((item) => item.id == page.page_no).icon}
                                </IconButton>
                                {page.page_tittle}
                              </Typography>
                            </>
                          }
                          control={<Checkbox checked={page.checked} onChange={() => handleChange(page_default_role_level, page.page_no)} />}
                        />
                      </ListItemButton>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          );
        })}
    </>
  );
};
export default AccessCheckbox;
