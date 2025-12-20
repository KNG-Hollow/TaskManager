import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Task } from './utility/Interfaces';
import { UseAccount, UseAppState, UseErrorState } from '../context/Context';
import { GetTasks } from './utility/ApiServices';

export default function Home() {
  const { account } = UseAccount();
  const { appState } = UseAppState();
  const { errorState, setErrorState } = UseErrorState();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const name = account!.name.charAt(0).toUpperCase() + account!.name.slice(1);

  useEffect(() => {
    if (!appState?.active || account === null) {
      navigate('/login');
    }
    if (errorState?.active) {
      navigate('/error');
    }
    const fetchTasks = async () => {
      let successful = false;

      try {
        const [fetchSuccessful, fetchedTasks] = await GetTasks();
        successful = fetchSuccessful;
        if (!successful) {
          alert('Failed To Get Tasks');
          throw new Error('Failed To Get Tasks array');
        }
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Failed To Get Tasks Array: ' + err);
        setErrorState({
          active: true,
          title: 'Failed To Get Tasks',
          message: `GetTasks() Failed To Return An Acceptable Array :: ${err}`,
        });
        throw new Error('Failed To Get Tasks Array: ' + err);
      }
    };
    fetchTasks();
  }, [navigate, appState, account, errorState, setErrorState]);

  return (
    <div className="mt-12 flex w-full flex-1 flex-col">
      <div className="items-center justify-center border-6 bg-fuchsia-700 py-10 text-2xl font-bold">
        <h2>Welcome Home {name}</h2>
      </div>
      <div className="mt-10 mb-20 flex w-11/12 flex-col self-center">
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
      <div>
        <div className="justify-center">
          <div id="recent-tasks-text">
            <h2 className="">Recent Tasks:</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <table className="w-11/12">
            <thead>
              <tr>
                <th>Title:</th>
                <th>Created:</th>
                <th>Created By:</th>
                <th>Active:</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: Task) => (
                <tr key={task.id} className="border-2 border-blue-400">
                  <td>{task.name}</td>
                  <td>{task.created.toLocaleString().slice(0, 10)}</td>
                  <td>{task.username}</td>
                  <td>{task.active ? 'True' : 'False'}</td>
                  <div
                    id="recent-tasks-buttons"
                    className="flex flex-col border-2 border-blue-400"
                  >
                    <button
                      onClick={() => {
                        navigate(`/tasks/${task.id}`, {
                          state: { id: task.id },
                        });
                      }}
                    >
                      View
                    </button>
                    <button>Delete</button>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="recent-tasks-buttons"></div>
      </div>
    );
  }
}
