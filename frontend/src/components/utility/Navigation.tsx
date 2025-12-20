import { Link } from 'react-router-dom';
import { UseAppState } from '../../context/Context';

export default function Navigation() {
  const { appState } = UseAppState();
  const isActive = appState?.active ? true : false;

  if (!isActive) {
    return null;
  }

  return (
    <div className="flex w-full content-center justify-center bg-fuchsia-700 py-3">
      <nav className="items-center px-8">
        <ul className="flex flex-row gap-16 self-center">
          {/*
          <li>
            {!isActive ? (
              <Link id="link-login" to="/login" className="text-white">
                Login
              </Link>
            ) : null}
          </li>
          */}
          <li>
            {isActive ? (
              <Link id="link-home" to="/home" className="text-white">
                Home
              </Link>
            ) : null}
          </li>
          <li>
            {isActive && appState!.admin ? (
              <Link id="link-accounts" to="/accounts" className="text-white">
                Accounts
              </Link>
            ) : null}
          </li>
          <li>
            {isActive ? (
              <Link id="link-tasks" to="/tasks" className="text-white">
                Tasks
              </Link>
            ) : null}
          </li>
          <li>
            {isActive ? (
              <Link
                id="link-logout"
                to="/logout"
                className="font-extrabold text-red-600"
              >
                Logout
              </Link>
            ) : null}
          </li>
          <li>
            {isActive && appState!.admin ? (
              <Link
                id="link-error"
                to="/error"
                className="font-extrabold text-red-600"
              >
                Error Page
              </Link>
            ) : null}
          </li>
        </ul>
      </nav>
    </div>
  );
}
