import React, { createContext, useContext, useState } from 'react';
import { type Account, type AppState } from '../components/utility/Interfaces';

interface AccountContextType {
    account: Account | null;
    setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}

interface AppContextType {
    appState: AppState | null;
    setAppState: React.Dispatch<React.SetStateAction<AppState | null>>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);
const AppStateContext = createContext<AppContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<Account | null>(null);

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    );
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appState, setAppState] = useState<AppState | null>(null);

    return (
        <AppStateContext.Provider value={{ appState, setAppState }}>
            {children}
        </AppStateContext.Provider>
    );
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
}