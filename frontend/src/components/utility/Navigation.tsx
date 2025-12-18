import { Link } from 'react-router-dom';
import { UseAppState } from '../../context/Context';

export default function Navigation() {
  const { appState } = UseAppState();
  let isVisible: boolean;
  //let isActive: boolean;

  if (appState === null) {
    isVisible = false;
  } else {
    isVisible = true;
  }

  return (
    <div className="flex w-full content-center justify-center bg-blue-600 px-6 py-3">
      <nav className="w-full items-center px-8">
        <ul className="mx-auto flex flex-row justify-center gap-16 self-center">
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
    </div>
  );
}
