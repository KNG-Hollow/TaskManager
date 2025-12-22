import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Task } from './utility/Interfaces';
import { UseAccount, UseAppState, UseErrorState } from '../context/Context';
import { DeleteTask, GetTasks } from './utility/ApiServices';

// TODO If Not Admin, Only Show Tasks The Account User Created

export default function Home() {
  const { account } = UseAccount();
  const { appState } = UseAppState();
  const { errorState, setErrorState } = UseErrorState();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const name = account!.name.charAt(0).toUpperCase() + account!.name.slice(1);

  const handleDelete = async (id: number) => {
    let successful: boolean;

    try {
      console.log('Attempting To Delete Task With ID: ' + id);
      const [deleteSuccessful, taskId] = await DeleteTask(id);
      successful = deleteSuccessful;
      if (!successful) {
        throw new Error('Failed To Delete Task');
      }
      console.log('Successfully Deleted Task With ID: ' + taskId);
      const updatedArray = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedArray);
      alert('Successfully Deleted Task With ID: ' + taskId);
    } catch (err) {
      console.error(
        `API Service Failed To Delete Task With ID [${id}]:\n${err}`
      );
      alert('Failed To Delete Task');
      setErrorState({
        active: true,
        title: 'Failed To Delete Task!',
        message: `API Service Failed To Delete Task With ID [${id}]:\n${err}`,
      });
    }
  };

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
        console.log('Attempting To Get Tasks...');
        const [fetchSuccessful, fetchedTasks] = await GetTasks();
        successful = fetchSuccessful;
        if (!successful) {
          throw new Error('Failed To Get Tasks array');
        }
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Failed To Get Tasks Array: ' + err);
        alert(`API Service Failed To Get Tasks:\n${err}`);
        setErrorState({
          active: true,
          title: 'Failed To Get Tasks',
          message: `GetTasks() Failed To Return An Acceptable Array ::\n${err}`,
        });
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
    const limit: number = 10;

    const populateRecent = () => {
      const rows = [];
      let count = 0;

      while (count < limit && count < tasks.length) {
        const task = tasks[count];

        rows.push(
          <tr key={task.id} className="border-2 border-blue-400">
            <td>{task.name}</td>
            <td>{task.created.toLocaleString().slice(0, 10)}</td>
            <td>{task.username}</td>
            <td>{task.active ? 'True' : 'False'}</td>
            <td
              id="recent-tasks-buttons"
              className="flex flex-row border-l-2 border-blue-400"
            >
              <button
                className="w-3/5 self-center text-green-700"
                onClick={() => {
                  navigate(`/tasks/${task.id}`, {
                    state: { id: task.id },
                  });
                }}
              >
                View
              </button>
              <button
                onClick={() => {
                  handleDelete(task.id!);
                }}
                className="w-3/5 self-center text-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        );
        count++;
      }
      return rows;
    };

    return (
      <div>
        <div className="flex flex-col items-center justify-center">
          <div
            id="recent-tasks-text"
            className="w-11/12 border-2 border-blue-400 py-3"
          >
            <h2 className="font-bold">Recent Tasks:</h2>
          </div>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center">
          <table className="w-11/12">
            <thead>
              <tr>
                <th>Title:</th>
                <th>Created:</th>
                <th>Created By:</th>
                <th>Active:</th>
              </tr>
            </thead>
            <tbody>{populateRecent()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
