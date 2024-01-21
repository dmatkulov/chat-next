import React from 'react';
import {Grid, ListItemText} from '@mui/material';
import dayjs from 'dayjs';
import {MessageApi} from '@/src/types';

interface Props {
  message: MessageApi;
}
const ChatItem: React.FC<Props> = ({message}) => {
  const formattedDate = dayjs(message.datetime).format('DD.MM.YYYY, HH:mm');
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText primary={message.author}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText secondary={formattedDate}> {message.message}</ListItemText>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatItem;