import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAppState } from '../../context/Context';

export default function CreateTask() {
  const navigate = useNavigate();
  const { appState } = UseAppState();

  useEffect(() => {
    if (!appState?.active) {
      navigate('/error');
    }
  }, [navigate, appState]);

  return <h1>Routing Works!</h1>;
}
