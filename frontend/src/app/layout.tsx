'use client';
import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import theme from '@/src/theme';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import AppToolbar from '@/src/components/UI/AppToolbar/AppToolbar';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline/>
          <html lang="en">
          <body style={{backgroundColor: '#eeee'}}>
          <header>
            <AppToolbar/>
          </header>
          <main>
            <Container maxWidth="md">
              {children}
            </Container>
          </main>
          </body>
          </html>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
