import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: "90%" , px: 2}}>
      <Skeleton key="1"/>
      <Skeleton animation="wave" width="80%" key="3"/>
      <Skeleton animation={false} key="2"/>
    </Box>
  );
}