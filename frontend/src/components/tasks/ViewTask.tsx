import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAppState } from '../../context/Context';

export default function Task() {
  const navigate = useNavigate();
  const { appState } = UseAppState();

  useEffect(() => {
    if (!appState?.active) {
      navigate('/error');
    }
  }, [navigate, appState]);

  return (
    <div className="w-full flex-1 flex-col">
      <h1>Routing Works!</h1>
    </div>
  );
}
