import React from 'react';
import {Grid, ListItem, ListItemText} from '@mui/material';

const ChatItem = () => {
  return (
    <div>
      <ListItem key="1">
        <Grid container>
          <Grid item xs={12}>
            <ListItemText primary="Hey man, What's up ?"></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText secondary="09:30"> {" — I'll be in your neighborhood doing errands this…"}</ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};

export default ChatItem;