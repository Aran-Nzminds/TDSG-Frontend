import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; //! I will remove it probably - not needed
import App from './App.tsx';
import '@styles/variables.css';
import '@styles/global.css';
import { AuthProvider } from '@hooks/use-auth.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
