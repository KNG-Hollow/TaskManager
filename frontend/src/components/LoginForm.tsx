import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from 'axios';
import type { Account, AppState } from './utility/Interfaces';
import { UseAccount, UseAppState } from '../context/Context';

export default function Login() {
  const [isActive, setActive] = useState<boolean>(false);
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [usernameIn, setUsernameValue] = useState<string>('');
  const [passwordIn, setPasswordValue] = useState<string>('');
  const navigate = useNavigate();

  return (
    <div className="component-container">
      <div className="header">
        <h2>Login</h2>
      </div>
      <div className="component-view">
        <div id="login-container">
          <div id="login-header"></div>
          <div id="login-info"></div>
          <div id="login-form">
            <div id="input-username">
              <label htmlFor="username-area">Username:</label>
              <input
                type="text"
                aria-label="username"
                placeholder="username"
                value={usernameIn}
                onChange={(e) => setUsernameValue(e.target.value)}
              ></input>
            </div>
            <div id="input-password">
              <label htmlFor="password-area">Password:</label>
              <input
                type="text"
                aria-label="password"
                placeholder="password"
                value={passwordIn}
                onChange={(e) => setPasswordValue(e.target.value)}
              ></input>
            </div>
          </div>
          <div id="login-buttons">
            <div id="login-button">
              <button
                onClick={async () => {
                  console.log('Attempting To Login as: ', usernameIn);
                  const [exists, accountInfo] = await authorizeUser(
                    usernameIn,
                    passwordIn
                  );
                  const { setAppState } = UseAppState();
                  const appState: AppState = { active: false, admin: false };

                  if (!exists) {
                    setActive(false);
                    setAdmin(false);
                    appState.active = isActive;
                    appState.admin = isAdmin;

                    setAppState(appState);
                    return;
                  } else {
                    setActive(true);
                    setAdmin(false);
                    appState.active = isActive;
                    appState.admin = isAdmin;

                    if (accountInfo.admin === true) {
                      setAdmin(true);
                      appState.admin = isAdmin;
                    }
                    const { setAccount } = UseAccount();
                    setAccount(accountInfo);
                    setAppState(appState);
                    navigate('/');
                  }
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function authorizeUser(
  username: string,
  password: string
): Promise<[boolean, Account]> {
  let exists: boolean = false;
  let account: Account = {} as Account;

  try {
    const response = await axios.get<Account>(
      'http://localhost:8081/api/auth',
      {
        params: {
          username,
          password,
        },
        withCredentials: true,
      }
    );
    if (response.status !== HttpStatusCode.Ok) {
      exists = false;
      throw new Error('Response Status: Unsuccessful');
    }
    exists = true;
    account = response.data;
    return [exists, account];
  } catch (err) {
    console.error(err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}
