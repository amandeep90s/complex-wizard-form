import { RoutesWrapper } from '@/routes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesWrapper />
  </StrictMode>
);
