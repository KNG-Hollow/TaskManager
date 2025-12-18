import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type AppState } from './utility/Interfaces';
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

  const handleLogin = async () => {
    console.log('Attempting To Login as: ', usernameIn);
    const [exists, accountInfo] = await AuthorizeUser(usernameIn, passwordIn);
    const appState: AppState = { active: false, admin: false };

    if (!exists) {
      setActive(false);
      setAdmin(false);
      appState.active = false;
      appState.admin = false;
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
                type="password"
                aria-label="password"
                placeholder="password"
                value={passwordIn}
                onChange={(e) => setPasswordValue(e.target.value)}
              ></input>
            </div>
          </div>
          <div id="login-buttons">
            <div id="login-button">
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
