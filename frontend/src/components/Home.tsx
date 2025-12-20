import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { type Task } from './utility/Interfaces';
import { UseAccount, UseAppState } from '../context/Context';

export default function Home() {
  const { account } = UseAccount();
  const { appState } = UseAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appState?.active) {
      navigate('/login');
    }
  }, [navigate, appState]);

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="items-center justify-center border-6 bg-fuchsia-700 py-10 text-2xl font-bold">
        <h2>Welcome Home {account?.name}</h2>
      </div>
      <div className="mt-10 flex w-11/12 flex-col self-center">
        <div id="home-container">
          <div
            id="home-info"
            className="rounded-2xl border-2 border-blue-600 py-5"
          >
            <Information />
          </div>
          <div
            id="activeTasks-container"
            className="mt-10 rounded-l border-2 border-blue-600 py-5"
          >
            <ActiveTasks />
          </div>
        </div>
      </div>
    </div>
  );
}

function Information() {
  const { appState } = UseAppState();
  const navigate = useNavigate();
  const adminVisible = appState?.admin === true ? true : false;
  const adminButtons = () => {
    if (!adminVisible) {
      return null;
    }
    return (
      <div id="button-container-admin">
        <button
          onClick={() => {
            navigate('/create-account');
          }}
        >
          Create Account
        </button>
        <button
          onClick={() => {
            navigate('/accounts');
          }}
        >
          Accounts
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2>Info</h2>
      <div id="button-container">
        <button
          onClick={() => {
            navigate('/create-task');
          }}
        >
          Create Task
        </button>
        <button
          onClick={() => {
            navigate('/tasks');
          }}
        >
          Tasks
        </button>
      </div>
      {adminButtons()}
    </div>
  );
}

function ActiveTasks() {
  return (
    <div>
      <h2>Beans</h2>
    </div>
  );
}
