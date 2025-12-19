import { useEffect, useState } from 'react';
import { UseAppState } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { appState, setAppState } = UseAppState();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const redirectText = () => {
    if (countdown === 0) {
      return <p>Redirecting to login page...</p>;
    }
  };

  useEffect(() => {
    if (!appState?.active) {
      navigate('/login');
      window.location.reload();
    }
    const handleLogout = () => {
      setAppState({ active: false, admin: false });
      navigate('/login');
      window.location.reload();
    };

    const timeoutId = setTimeout(handleLogout, 5000);
    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [navigate, appState, setAppState]);

  return (
    <div className="flex h-full w-full flex-1 flex-col self-center px-4">
      <div className="flex h-1/5 w-full items-center justify-center text-2xl font-bold">
        <h2>Logging Out</h2>
      </div>
      <div className="mx-auto flex h-4/5 w-full flex-col justify-center text-xl">
        <div id="logout-container">
          <div id="logout-header">
            <p>
              You are being logged out in...
              <p className="font-extrabold text-red-600">{countdown}</p>
            </p>
          </div>
          <div id="logout-info">{redirectText()}</div>
        </div>
      </div>
    </div>
  );
}
