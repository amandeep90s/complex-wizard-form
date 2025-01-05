import { RoutesWrapper } from '@/routes';
import { theme } from '@/utils/theme';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider />
      <RoutesWrapper />
    </ThemeProvider>
  </StrictMode>
);
