import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  AccountProvider,
  AppStateProvider,
  ErrorStateProvider,
  JWTProvider,
} from './context/Context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JWTProvider>
      <AppStateProvider>
        <ErrorStateProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
        </ErrorStateProvider>
      </AppStateProvider>
    </JWTProvider>
  </StrictMode>
);
