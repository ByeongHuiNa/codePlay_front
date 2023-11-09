import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, CardContent, ClickAwayListener, Grid, IconButton, Paper, Popper, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';

// assets
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth, useProfileState } from 'store/module';
import { useNavigate } from '../../../../../../node_modules/react-router-dom/dist/index';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const theme = useTheme();
  let navigate = useNavigate();
  const {setIsLoggedIn} = useAuth();


  const handleLogout = async () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/auth/login-form');
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

  const { profile } = useProfileState();

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {Object.keys(profile).length > 0 && (
          <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
            <Avatar src={profile.user_profile} sx={{ width: 32, height: 32 }} />
            <Typography variant="subtitle1">{profile.user_name}</Typography>
          </Stack>
        )}
      </ButtonBase>
      <Popper
        placement="bottom-end"
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
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          {Object.keys(profile).length > 0 && (
                            <Stack direction="row" spacing={1.25} alignItems="center">
                              <Avatar src={profile.user_profile} sx={{ width: 32, height: 32 }} />
                              <Stack>
                                <Typography variant="h6">{profile.user_name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {`${profile.dept_name}/${profile.user_position}`}
                                </Typography>
                              </Stack>
                            </Stack>
                          )}
                        </Grid>
                        <Grid item>
                          <IconButton size="large" color="secondary" onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <ProfileTab handleLogout={handleLogout} handleToggle={handleToggle} />
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
