import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AccountProvider, AppStateProvider } from './context/Context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccountProvider>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </AccountProvider>
  </StrictMode>
);
