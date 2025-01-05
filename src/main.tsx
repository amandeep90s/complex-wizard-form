import { RoutesWrapper } from '@/routes';
import { theme } from '@/utils/theme';
import { ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RoutesWrapper />
    </ThemeProvider>
  </StrictMode>
);
