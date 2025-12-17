import React, { createContext, useContext, useState } from 'react';
import { type Account } from '../components/utility/Interfaces';

interface AccountContextType {
    account: Account | null;
    setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<Account | null>(null);
    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    );
};

export const UseAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error('useAccount must be used within an AccountProvider');
    }
    return context;
};