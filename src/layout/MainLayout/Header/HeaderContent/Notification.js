/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Popper,
  Typography,
  useMediaQuery
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import { BellOutlined, CloseOutlined, GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { jwtDecode } from '../../../../../node_modules/jwt-decode/build/cjs/index';
import { useAlarm } from 'store/module';
import axios from '../../../../../node_modules/axios/index';
import { useNavigate } from '../../../../../node_modules/react-router-dom/dist/index';

// sx styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',

  transform: 'none'
};

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const { alarm, setAlarm, addAlarm } = useAlarm();
  const token = jwtDecode(localStorage.getItem('token').slice(7));
  let navigate = useNavigate();

  useEffect(() => {
    let eventSource = undefined;
    eventSource = new EventSource(`/api/alarm?user_no=${token.user_no}`);
    eventSource.onopen = () => {
      console.log('connection opened');
    };
    eventSource.onmessage = (event) => {
      //0번은 커넥션 이벤트
      if (event.lastEventId != '0') {
        addAlarm(JSON.parse(event.data));
      }
    };

    eventSource.onerror = (event) => {
      console.log(event.target.readyState);
      if (event.target.readyState === EventSource.CLOSED) {
        console.log('eventsource closed (' + event.target.readyState + ')');
      }
      eventSource.close();
    };
    return () => {
      console.log('eventsource closed');
      eventSource.close();
    };
  }, []);

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const removeState = (alarm_no) => {
    setAlarm(alarm.filter((item) => item.alarm_no !== alarm_no));
  };
  const updateState = (alarm_no) => {
    const temp = alarm.slice();
    temp.filter((item) => item.alarm_no == alarm_no)[0].status = 1;
    setAlarm(temp);
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = 'grey.300';
  const iconBackColor = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={Object.keys(alarm).length > 0 ? alarm.filter((item) => item.status == 0).length : 0} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: '100%',
                minWidth: 285,
                maxWidth: 420,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 285
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="알림"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <IconButton size="small" onClick={handleToggle}>
                      <CloseOutlined />
                    </IconButton>
                  }
                >
                  <List
                    component="nav"
                    sx={{
                      p: 0,
                      '& .MuiListItemButton-root': {
                        py: 0.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                      }
                    }}
                  >
                    {Object.keys(alarm).length > 0 &&
                      alarm.map((item) => {
                        return (
                          <ListItemButton
                            key={item.alarm_no}
                            onClick={() => {
                              axios.put(`/alarm?alarm_no=${item.alarm_no}`);
                              updateState(item.alarm_no);
                              navigate(item.go_to_url, {
                                state: {
                                  val: 0,
                                  index: item.alarm_index,
                                  data_no: item.alarm_data_no
                                }
                              });
                            }}
                          >
                            {item.kind == 0 && (
                              // 알림 종류별로 아이콘 바꿀수 있게.
                              <ListItemAvatar>
                                <Avatar
                                  sx={{
                                    color: 'success.main',
                                    bgcolor: 'success.lighter'
                                  }}
                                >
                                  <GiftOutlined />
                                </Avatar>
                              </ListItemAvatar>
                            )}
                            <ListItemText
                              primary={<Typography variant={item.status == 0 ? 'subtitle1' : 'h6'}>{item.content}</Typography>}
                              secondary={item.date}
                            />
                            <ListItemSecondaryAction>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  axios.put(`/alarm-delete?alarm_no=${item.alarm_no}`);
                                  removeState(item.alarm_no);
                                }}
                              >
                                <CloseOutlined />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                        );
                      })}
                    {/* <ListItemButton key={'view-all'} sx={{ textAlign: 'center', py: `${12}px !important` }}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            View All
                          </Typography>
                        }
                      />
                    </ListItemButton> */}
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Notification;

{
  /*  <ListItemButton onClick={() => console.log('리스트 누름')}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'success.main',
                            bgcolor: 'success.lighter'
                          }}
                        >
                          <GiftOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            It&apos;s{' '}
                            <Typography component="span" variant="subtitle1">
                              Cristina danny&apos;s
                            </Typography>{' '}
                            birthday today.
                          </Typography>
                        }
                        secondary="2 min ago"
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('X표시누름');
                          }}
                        >
                          <CloseOutlined />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }}
                        >
                          <MessageOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            <Typography component="span" variant="subtitle1">
                              Aida Burg
                            </Typography>{' '}
                            commented your post.
                          </Typography>
                        }
                        secondary="5 August"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          6:00 PM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            color: 'error.main',
                            bgcolor: 'error.lighter'
                          }}
                        >
                          <SettingOutlined />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            Your Profile is Complete &nbsp;
                            <Typography component="span" variant="subtitle1">
                              60%
                            </Typography>{' '}
                          </Typography>
                        }
                        secondary="7 hours ago"
                      />
                      <ListItemSecondaryAction>
                        <Typography variant="caption" noWrap>
                          2:45 PM
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItemButton>
                    <Divider /> */
}
