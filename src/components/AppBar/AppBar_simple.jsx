import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const AppBar_simple = () => {

  const handleNotification = () => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Hello, this is a browser notification!');
        }
      });
    }
  };
  return (
    <div>
      <AppBar position="static" style={{borderRadius:"20px 20px 0px 0px",backgroundColor:"#f06292"}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Kavaya Water Pool
          </Typography>
          <IconButton color="inherit" onClick={handleNotification}> 
            <Badge badgeContent={3} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Your content goes here */}
    </div>
  );
};

export default AppBar_simple;
