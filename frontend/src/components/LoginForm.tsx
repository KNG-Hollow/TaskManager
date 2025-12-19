import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AppState, Account } from './utility/Interfaces';
import { UseAccount, UseAppState } from '../context/Context';
import { AuthorizeUser } from './utility/ApiServices';

export default function Login() {
  const [, setActive] = useState<boolean>(false);
  const [, setAdmin] = useState<boolean>(false);
  const [usernameIn, setUsernameValue] = useState<string>('');
  const [passwordIn, setPasswordValue] = useState<string>('');
  const { setAppState } = UseAppState();
  const { setAccount } = UseAccount();
  const navigate = useNavigate();

  let exists: boolean;
  let accountInfo: Account;

  const handleLogin = async () => {
    if (usernameIn.trim().length === 0 || passwordIn.trim().length === 0) {
      console.error('fields in the login form cannot be empty');
      alert('Try Again: Please Fill In Both Username And Password To Login.');
      return;
    }

    console.log('Attempting To Login as: ', usernameIn);
    try {
      [exists, accountInfo] = await AuthorizeUser(usernameIn, passwordIn);
      console.log('Exists:', exists, 'Account Info:', accountInfo);
    } catch (err) {
      console.error(err);
      throw new Error(`Failed To Authorize User: ${usernameIn}\n` + err);
    }
    const appState: AppState = { active: false, admin: false };

    if (!exists) {
      setActive(false);
      setAdmin(false);
      appState.active = false;
      appState.admin = false;
      alert('Account Was Not Found In The Database!');
    } else {
      setActive(true);
      setAdmin(accountInfo.admin);
      appState.active = true;
      appState.admin = accountInfo.admin;
    }

    console.log(
      "'appState' variable returned as: ",
      appState.active,
      appState.admin
    );
    setAppState(appState);
    setAccount(accountInfo);

    if (exists) {
      navigate('/');
    }
  };

  return (
    <div className="flex h-full w-full flex-col px-4">
      <div className="flex h-1/5 w-full items-center justify-center border-4 bg-fuchsia-600 text-2xl font-bold">
        <h2>Login</h2>
      </div>
      <div className="flex h-4/5 w-full justify-center">
        <div id="login-container" className="mt-10 flex h-full flex-col">
          <div id="login-header"></div>
          <div id="login-info"></div>
          <div id="login-form">
            <div id="input-username" className="mb-2 flex space-x-2">
              <label htmlFor="username-area">Username:</label>
              <input
                className="rounded-sm border-2 border-fuchsia-600 bg-fuchsia-200 text-center text-fuchsia-900"
                type="text"
                aria-label="username"
                placeholder="..."
                value={usernameIn}
                onChange={(e) => setUsernameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogin();
                }}
              ></input>
            </div>
            <div id="input-password" className="flex space-x-3">
              <label htmlFor="password-area">Password:</label>
              <input
                className="rounded-sm border-2 border-fuchsia-600 bg-fuchsia-200 text-center text-fuchsia-900"
                type="password"
                aria-label="password"
                placeholder="..."
                value={passwordIn}
                onChange={(e) => setPasswordValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogin();
                }}
              ></input>
            </div>
          </div>
          <div id="login-buttons" className="mt-10">
            <div id="login-button">
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
