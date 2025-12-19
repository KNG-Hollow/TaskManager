import { useNavigate } from 'react-router-dom';
import { UseAppState, UseErrorState } from '../../context/Context';
import type { ErrorState } from './Interfaces';
//import { useEffect } from 'react';

export default function Error() {
  const { errorState, setErrorState } = UseErrorState();
  const { appState } = UseAppState();
  const navigate = useNavigate();

  const blankError: ErrorState = { active: false, title: '', message: '' };

  console.log('appState variable when entering /error: ', appState);
  /*
  useEffect(() => {
    if (!appState?.active) {
      navigate('/login');
    }
  }, [navigate, appState]);
  */
  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <div
        id="container-header"
        className="flex h-1/5 w-full items-center justify-center text-2xl font-bold text-red-600"
      >
        <h1>Error</h1>
      </div>
      <div className="mx-auto flex h-4/5 w-full flex-col justify-center text-xl">
        <div id="error-container" className="flex w-full flex-col text-red-500">
          <div id="error-header">
            <h4>
              You Have Run Into An Error On The Website! Please Let The
              Administrator Know Of The Situation.
            </h4>
          </div>
          <div id="error-info" className="mt-5">
            <h3>Error Title: </h3>
            <h3>{errorState?.title}</h3>
          </div>
          <div id="error-message" className="mt-20">
            <h4>Error Message: </h4>
            <p>{errorState?.message}</p>
          </div>
        </div>
        <div id="button-container" className="mt-10">
          <button
            onClick={() => {
              setErrorState(blankError);
              console.log("Error State When Leaving '/error': ", blankError);
              navigate('/login');
              history.go(0);
            }}
          >
            Login Page
          </button>
        </div>
      </div>
    </div>
  );
}
