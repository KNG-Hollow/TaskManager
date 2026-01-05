import React, { createContext, useContext, useState } from 'react';
import {
  type Account,
  type AppState,
  type ErrorState,
  type JwtObject,
} from '../components/utility/Interfaces';

// TODO Remove Global Account Info, Change To JWT Payload
interface JWTContextType {
  token: string | null;
  payload: JwtObject | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setPayload: React.Dispatch<React.SetStateAction<JwtObject | null>>;
}

interface AccountContextType {
  account: Account | null;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}

interface AppContextType {
  appState: AppState | null;
  setAppState: React.Dispatch<React.SetStateAction<AppState | null>>;
}

interface ErrorContextType {
  errorState: ErrorState | null;
  setErrorState: React.Dispatch<React.SetStateAction<ErrorState | null>>;
}

const JWTContext = createContext<JWTContextType | undefined>(undefined);
const AccountContext = createContext<AccountContextType | undefined>(undefined);
const AppStateContext = createContext<AppContextType | undefined>(undefined);
const ErrorStateContext = createContext<ErrorContextType | undefined>(
  undefined
);

export const JWTProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [payload, setPayload] = useState<JwtObject | null>(null);

  return (
    <JWTContext.Provider value={{ token, setToken, payload, setPayload }}>
      {children}
    </JWTContext.Provider>
  );
};

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<Account | null>(null);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [appState, setAppState] = useState<AppState | null>(null);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const ErrorStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [errorState, setErrorState] = useState<ErrorState | null>(null);

  return (
    <ErrorStateContext.Provider value={{ errorState, setErrorState }}>
      {children}
    </ErrorStateContext.Provider>
  );
};

export const UseJWT = () => {
  const context = useContext(JWTContext);
  if (!context) {
    throw new Error('useJWT must be used within a JWTProvider');
  }
  return context;
};

export const UseAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

export const UseAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export const UseErrorState = () => {
  const context = useContext(ErrorStateContext);
  if (!context) {
    throw new Error('useAccount must be used within an ErrorStateProvider');
  }
  return context;
};
