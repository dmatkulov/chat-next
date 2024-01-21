'use client';
import ChatForm from '@/src/components/UI/ChatForm/ChatForm';
import {useMutation} from '@tanstack/react-query';
import {Message} from '@/src/types';
import axiosApi from '@/src/axiosApi';
import {Divider, Grid, List, Typography} from '@mui/material';
import ChatItem from '@/src/components/UI/ChatItem/ChatItem';

export default function Home() {
  const mutation = useMutation({
    mutationFn: async (messageData: Message) => {
      await axiosApi.post('/messages', messageData);
    }
  });
  
  const onSubmit = async (messageData: Message) => {
    await mutation.mutateAsync(messageData);
  };
  return (
    <>
      <Grid container>
        <Grid item xs >
          <Typography variant="h5"
          >
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <List sx={{ width: '100%', backgroundColor: '#f6f6f6'}}>
          <ChatItem/>
        </List>
        <Divider />
        <ChatForm
          isLoading={mutation.isPending}
          onSubmit={onSubmit}
        />
      </Grid>
    </>
  );
}
