import { useNavigate } from 'react-router-dom';
import { UseAppState } from '../../context/Context';
import { useEffect } from 'react';

// TODO Only Allow Original Creator Access To Edit/Delete The Task

export default function EditTaskForm() {
  const navigate = useNavigate();
  const { appState } = UseAppState();

  useEffect(() => {
    if (!appState?.active) {
      navigate('/error');
    }
  }, [navigate, appState]);

  return (
    <div className="mt-12 flex w-full flex-1 flex-col">
      <h1>EditTaskForm Routing Works</h1>
    </div>
  );
}
