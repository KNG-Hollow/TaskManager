import { useNavigate } from 'react-router-dom';
import { UseAppState } from '../../context/Context';
import { useEffect } from 'react';

// TODO Only Allow Original User Access To Edit Account

export default function EditAccountForm() {
  const navigate = useNavigate();
  const { appState } = UseAppState();

  useEffect(() => {
    if (!appState?.active || !appState?.admin) {
      navigate('/error');
    }
  }, [navigate, appState]);

  return (
    <div className="mt-12 flex w-full flex-1 flex-col">
      <h1>EditAccountForm Routing Works</h1>
    </div>
  );
}
