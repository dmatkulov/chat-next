import React from 'react';
import {MessageApi} from '@/src/types';
import {formatMessageDate} from '@/src/helpers/constans';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {Grid, Typography} from '@mui/material';
import {blue, cyan, green, grey, indigo, orange, pink, purple, red, teal} from '@mui/material/colors';

interface Props {
  message: MessageApi;
}

const ChatItem: React.FC<Props> = ({message}) => {
  const formattedDate = formatMessageDate(message.datetime);
  
  const muiColors = [green[500], blue[500], red[500], orange[500], pink[500], purple[500], teal[500], grey[500], indigo[500], cyan[500]];
  const index = Math.floor(Math.random() * muiColors.length);
  
  return (
    <>
      <Grid container>
        <ListItemAvatar>
          <Avatar sx={{backgroundColor: muiColors[index]}}>{message.author.charAt(0)}</Avatar>
        </ListItemAvatar>
        <Grid item xs>
          <Grid item xs={12}>
            <Typography variant="h6">{message.author}</Typography>
          </Grid>
          <Grid item xs={12}>
            <ListItemText secondary={formattedDate}> {message.message}</ListItemText>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatItem;