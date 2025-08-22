import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; //! I will remove it probably - not needed
import App from './App.tsx';
import '@styles/variables.css';
import '@styles/global.css';
import { AuthProvider } from '@hooks/use-auth.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
