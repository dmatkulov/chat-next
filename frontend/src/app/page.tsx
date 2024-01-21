'use client';
import ChatForm from '@/src/components/UI/ChatForm/ChatForm';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Message, MessageApi} from '@/src/types';
import axiosApi from '@/src/axiosApi';
import {Grid, List, ListItem} from '@mui/material';
import ChatItem from '@/src/components/UI/ChatItem/ChatItem';
import React from 'react';
import Skeleton from '@/src/components/UI/ChatItem/Skeleton';

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
      return messagesResponse.data;
    }
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
      <Grid container direction="column" height="70vh">
        <Grid
          item
          xs={9}
          sx={{
          overflowY: 'auto'
        }}
        >
          <List
            sx={{
              width: '100%',
              backgroundColor: '#f6f6f6'
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
