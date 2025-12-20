import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Task } from './utility/Interfaces';
import { UseAccount, UseAppState } from '../context/Context';

export default function Home() {
  const { account } = UseAccount();
  const { appState } = UseAppState();
  const navigate = useNavigate();
  const tasks: Task[] = [];

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
            className="mt-10 mb-10 rounded-l border-2 border-blue-600 py-5"
          >
            <ActiveTasks />
          </div>
        </div>
      </div>
    </div>
  );

  function Information() {
    const { appState } = UseAppState();
    const navigate = useNavigate();
    const adminVisible = appState?.admin === true ? true : false;

    const adminButtons = () => {
      if (!adminVisible) {
        return null;
      }
      return (
        <div
          id="button-container-admin"
          className="flex w-1/2 flex-col self-center"
        >
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
      <div className="">
        <div id="information-text-header">
          <h2>Info</h2>
        </div>
        <div id="information-text-container">
          <h2 className="">Total Tasks: {tasks.length}</h2>
        </div>
        <div id="button-container" className="flex flex-col">
          <div
            id="button-container-task"
            className="flex w-1/2 flex-col self-center"
          >
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
      </div>
    );
  }

  function ActiveTasks() {
    return (
      <>
        <div className="justify-center">
          <div id="recent-tasks-text">
            <h2 className="">Recent Tasks:</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <table>
            <thead>
              <tr>
                <th>Table Head</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Table</td>
              </tr>
              <tr>
                <td>Body</td>
              </tr>
              <tr>
                <td>Row</td>
              </tr>
              <tr>
                <td>Data</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
