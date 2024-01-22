'use client';
import ChatForm from '@/src/components/UI/ChatForm/ChatForm';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Message, MessageApi} from '@/src/types';
import axiosApi from '@/src/axiosApi';
import {Grid, List, ListItem, Typography} from '@mui/material';
import ChatItem from '@/src/components/UI/ChatItem/ChatItem';
import React from 'react';
import Skeleton from '@/src/components/UI/ChatItem/Skeleton';
import {blue} from '@mui/material/colors';

export default function Home() {
  const mutation = useMutation({
    mutationFn: async (messageData: Message) => {
      await axiosApi.post('/messages', messageData);
    }
  });
  
  const {data: messages, isLoading} = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const messagesResponse = await axiosApi.get<MessageApi[]>('/messages');
      return messagesResponse.data.reverse();
    },
    refetchInterval: 2000,
  });
  
  let content: React.ReactNode = <Skeleton/>;
  
  if (!isLoading && messages) {
    content = messages.map((message) => (
      <ListItem key={message.id}>
        <ChatItem message={message}></ChatItem>
      </ListItem>
    ));
  }
  const onSubmit = async (messageData: Message) => {
    await mutation.mutateAsync(messageData);
  };
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{
          backgroundColor: 'white',
          height: '50vh',
          paddingBottom: 2,
          paddingTop: 2,
          borderRadius: 2,
        }}>
        <Typography
          variant="h6"
          sx={{
            px: 2,
            color: blue[700]
          }}>
          ChatApp
        </Typography>
        <Grid
          item
          xs={9}
          sx={{
            overflowY: 'auto',
            borderBottom: 1,
            borderTop: 1,
            borderColor: '#eee',
            flexGrow: 1,
          }}
        >
          <List
            sx={{
              width: '100%',
            }}
          >
            {content}
          </List>
        </Grid>
        <ChatForm
          isLoading={mutation.isPending}
          onSubmit={onSubmit}
        />
      </Grid>
    </>
  );
}
