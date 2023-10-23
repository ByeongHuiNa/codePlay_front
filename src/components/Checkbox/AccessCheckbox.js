import { Checkbox, FormControlLabel, Stack } from '@mui/material/index';
import { useAccessPage, useTabState } from 'store/module';

const AccessCheckbox = () => {
  const { accessPage, setAccessPage } = useAccessPage();
  const { tab } = useTabState();

  const handleChange = (page_default_role_no, page_no) => {
    const pre = accessPage[page_default_role_no].find((pre) => pre.page_no == page_no).checked;
    accessPage[page_default_role_no].find((pre) => pre.page_no == page_no).checked = !pre;
    setAccessPage(accessPage);
  };
  const handleParentChange = (page_default_role_no) => {
    const pre =
      accessPage[page_default_role_no].reduce((pre, cur) => {
        return pre + cur.checked;
      }, 0) == accessPage[page_default_role_no].length;
    accessPage[page_default_role_no].forEach((element) => {
      element.checked = !pre;
    });
    setAccessPage(accessPage);
  };

  return (
    <>
      {Object.keys(accessPage).length > 0 &&
        Object.keys(accessPage).map((page_default_role_no) => {
          return (
            <Stack key={page_default_role_no} mb={2}>
              <FormControlLabel
                label={`${tab.find((item) => item.id == page_default_role_no).name} 페이지 전체`}
                control={
                  <Checkbox
                    checked={
                      accessPage[page_default_role_no].reduce((pre, cur) => {
                        return pre + cur.checked;
                      }, 0) === accessPage[page_default_role_no].length
                    }
                    indeterminate={
                      !(
                        accessPage[page_default_role_no].reduce((pre, cur) => {
                          return pre + cur.checked;
                        }, 0) === accessPage[page_default_role_no].length ||
                        accessPage[page_default_role_no].reduce((pre, cur) => {
                          return pre + cur.checked;
                        }, 0) === 0
                      )
                    }
                    onChange={() => handleParentChange(page_default_role_no)}
                  />
                }
              />
              <Stack direction="row">
                {accessPage[page_default_role_no].map((page) => {
                  return (
                    <FormControlLabel
                      key={page.page_no}
                      label={page.page_tittle}
                      control={<Checkbox checked={page.checked} onChange={() => handleChange(page_default_role_no, page.page_no)} />}
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
