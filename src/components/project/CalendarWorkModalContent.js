import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useCalendarGetScheduleList } from 'store/module';
import axios from '../../../node_modules/axios/index';
import { Typography } from '../../../node_modules/@mui/material/index';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

// eslint-disable-next-line react/prop-types
export default function CalendarWorkModalContent({ handleClose }) {
  // eslint-disable-next-line no-unused-vars
  const { dataList, updateDataList } = useCalendarGetScheduleList();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  // dataList를 한 번만 순회하여 left와 right 배열에 업데이트
  React.useEffect(() => {
    // dataList를 한 번만 순회하여 left와 right 배열에 업데이트
    const leftArray = [];
    const rightArray = [];
    const currentDate = new Date();

    dataList.forEach((item) => {
      const scheduleEndDay = new Date(item.schedule_endday);

      if (
        scheduleEndDay > currentDate ||
        (scheduleEndDay.getFullYear() === currentDate.getFullYear() &&
          scheduleEndDay.getMonth() === currentDate.getMonth() &&
          scheduleEndDay.getDate() === currentDate.getDate())
      ) {
        if (item.schedule_cardview) {
          leftArray.push(item);
        } else {
          rightArray.push(item);
        }
      }
    });

    setLeft(leftArray);
    setRight(rightArray);
  }, [dataList]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleSave = () => {
    console.log(left);
    console.log(right);
    left.map((item) => {
      const schedule = {
        schedule_cardview: true,
        schedule_no: item.schedule_no
      };
      axios.patch(`/user-schedule-cardview`, schedule);
      updateDataList(schedule);
    });
    right.map((item) => {
      const schedule = {
        schedule_cardview: false,
        schedule_no: item.schedule_no
      };
      axios.patch(`/user-schedule-cardview`, schedule);
      updateDataList(schedule);
    });
    handleClose();
  };

  const customList = (title, items) => {
    items.sort((a, b) => {
      const dateA = new Date(a.schedule_startday);
      const dateB = new Date(b.schedule_startday);
      return dateA - dateB;
    });
    return (
      <Card sx={{ mt: 7, backgroundColor: '#e3f2fd' }}>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={numberOfChecked(items) === items.length && items.length !== 0}
              indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected'
              }}
            />
          }
          title={
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
          }
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <List
          sx={{
            width: '100%',
            height: 400,
            bgcolor: 'background.paper',
            overflow: 'auto'
          }}
          dense
          component="div"
          role="list"
        >
          {items.map((value) => {
            const labelId = `${value.schedule_no}`;
            const originalStartDateString = value.schedule_startday; // 예: "2023-11-04 00:00:00.000"
            const startDateWithoutTime = new Date(originalStartDateString);
            const yearStart = startDateWithoutTime.getFullYear();
            const monthStart = startDateWithoutTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
            const dayStart = startDateWithoutTime.getDate();
            const formattedStartDate = `${yearStart}-${monthStart}-${dayStart}`; // "2023-11-04"

            const originalEndDateString = value.schedule_endday; // 예: "2023-11-05 00:00:00.000"
            const endDateWithoutTime = new Date(originalEndDateString);
            const yearEnd = endDateWithoutTime.getFullYear();
            const monthEnd = endDateWithoutTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
            const dayEnd = endDateWithoutTime.getDate();
            const formattedEndDate = `${yearEnd}-${monthEnd}-${dayEnd}`; // "2023-11-05"

            return (
              <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                  <Grid item xs={1.5}>
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </ListItemIcon>
                  </Grid>
                  <Grid item xs={6.5} sx={{ ml: -1 }}>
                    <ListItemText
                      id={labelId}
                      primary={<Typography variant="h6">{`${value.schedule_title}`}</Typography>}
                      sx={{ ml: 2, overflow: 'auto' }}
                    />
                  </Grid>
                  <Grid item xs={4} sx={{ ml: -1 }}>
                    <ListItemText
                      primary={<Typography variant="h6">{`${formattedStartDate} ~ ${formattedEndDate}`}</Typography>}
                      sx={{ mr: -2, overflow: 'auto' }}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      </Card>
    );
  };

  return (
    <>
      <Divider />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item sx={{ width: '45%' }}>
          {customList('중요 일정 선택', left)}
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '45%' }}>
          {customList('중요 일정 해제', right)}
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
        <Button
          size="large"
          variant="contained"
          color="primary" // 확인 버튼은 primary 스타일
          onClick={handleSave} // handleConfirm 함수를 호출하도록 설정
          sx={{ mt: 6, mr: 2 }} // 상단 여백 및 우측 여백 설정
        >
          저장
        </Button>
        <Button
          size="large"
          variant="contained"
          color="inherit" // 취소 버튼은 회색 스타일 (기본 스타일)
          onClick={handleClose} // handleCancel 함수를 호출하도록 설정
          sx={{ mt: 6, mr: 2 }} // 상단 여백 설정
        >
          취소
        </Button>
      </Grid>
    </>
  );
}
