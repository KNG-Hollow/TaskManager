import { useEffect } from 'react';
import { UseAppState } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { appState } = UseAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appState?.active) {
      navigate('/login');
    }
  }, [navigate, appState]);

  return (
    <div className="flex h-full w-full flex-1 flex-col self-center px-4">
      <div className="header">
        <h2>Logging Out...</h2>
      </div>
      <div className="component-view">
        <div id="logout-container">
          <div id="logout-header"></div>
          <div id="logout-info"></div>
        </div>
      </div>
    </div>
  );
}
