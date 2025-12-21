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
    <div className="mt-12 flex w-full flex-1 flex-col items-center">
      <div className="mt-10 mb-10 flex justify-center self-center text-2xl font-bold">
        <h2>Logging Out</h2>
      </div>
      <div className="mt-10 flex flex-col items-center text-xl">
        <div
          id="logout-container"
          className="flex flex-col items-center justify-center"
        >
          <div id="logout-header" className="mt-5 flex flex-col justify-center">
            <p>You are being logged out in...</p>
            <p className="mt-5 font-extrabold text-red-600">{countdown}</p>
          </div>
          <div id="logout-info">{redirectText()}</div>
        </div>
      </div>
    </div>
  );
}
