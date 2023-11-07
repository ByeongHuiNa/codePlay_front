import { Checkbox, FormControlLabel, Stack } from '@mui/material/index';
import { useAccessPage, useTabState } from 'store/module';
import { Divider } from '../../../node_modules/@mui/material/index';

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
            <Stack key={page_default_role_level} mb={2}>
              <FormControlLabel
                label={`${tab.find((item) => item.id == page_default_role_level).name} 페이지 전체`}
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
              <Divider sx={{ border: 1.5, borderColor: 'divider' }}></Divider>
              <Stack direction="column">
                {accessPage[page_default_role_level].map((page) => {
                  return (
                    <FormControlLabel
                      key={page.page_no}
                      label={page.page_tittle}
                      control={<Checkbox checked={page.checked} onChange={() => handleChange(page_default_role_level, page.page_no)} />}
                    />
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
