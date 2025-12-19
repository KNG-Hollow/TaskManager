import { useNavigate } from 'react-router-dom';
import { UseAppState, UseErrorState } from '../../context/Context';
import { useEffect } from 'react';

export default function Error() {
  const { errorState, setErrorState } = UseErrorState();
  const { appState, setAppState } = UseAppState();
  const navigate = useNavigate();

  console.log('appState when entering /error: ', appState);
  useEffect(() => {
    if (!appState?.active) {
      setErrorState({
        active: true,
        title: 'Not Authorized',
        message: 'You Do Not Have Access! Please Restart And Log Back In...',
      });
    }
  }, [navigate, appState, setErrorState]);

  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <div
        id="container-header"
        className="flex h-1/5 w-full items-center justify-center text-2xl font-bold text-red-700"
      >
        <h1>Error</h1>
      </div>
      <div className="mx-auto flex h-4/5 w-full flex-col justify-center text-xl">
        <div id="error-container" className="flex w-full flex-col text-red-600">
          <div id="error-header">
            <h4>
              You Have Run Into An Error On The Website! Please Let The
              Administrator Know Of The Situation.
            </h4>
          </div>
          <div id="error-info" className="mt-5 flex flex-col">
            <h3>Title: </h3>
            <h3 className="text-red-500">{errorState?.title}</h3>
          </div>
          <div id="error-message" className="flex flex-col">
            <h4>Message: </h4>
            <p className="text-red-500">{errorState?.message}</p>
          </div>
        </div>
        <div id="button-container" className="mt-10 flex h-1/5 justify-center">
          <button
            onClick={() => {
              setAppState({ active: false, admin: false });
              setErrorState({ active: false, title: '', message: '' });
              console.log("Error State When Leaving '/error': ", errorState);
              navigate('/login');
              window.location.reload();
            }}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
