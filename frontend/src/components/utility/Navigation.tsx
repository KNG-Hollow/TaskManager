import { Link } from 'react-router-dom';
import { UseAppState } from '../../context/Context';

export default function Navigation() {
  const { appState } = UseAppState();
  let isVisible: boolean;
  let isActive: boolean;

  if (appState === null) {
    isVisible = false;
  } else {
    isVisible = true;
  }

  return (
    <nav>
      <ul>
        <li>
          {isVisible ? (
            <Link id="link-home" to="/home">
              Home
            </Link>
          ) : null}
        </li>
        <li>
          <Link id="link-login" to="/login">
            Login
          </Link>
        </li>
        <li>
          {isVisible && appState!.admin ? (
            <Link id="link-accounts" to="/accounts">
              Accounts
            </Link>
          ) : null}
        </li>
        <li>
          {isVisible ? (
            <Link id="link-tasks" to="/tasks">
              Tasks
            </Link>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
