import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAccount, UseAppState, UseErrorState } from '../../context/Context';
import { GetTasks, DeleteTask } from '../utility/ApiServices';
import type { Task } from '../utility/Interfaces';

// TODO Route To Only Show User's Own Tasks

export default function Tasks() {
  const { account } = UseAccount();
  const { appState } = UseAppState();
  const { errorState, setErrorState } = UseErrorState();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

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
        const [fetchSuccessful, fetchedTasks] = await GetTasks();
        successful = fetchSuccessful;
        if (!successful) {
          throw new Error('Failed To Get Tasks array');
        }
        setTasks(fetchedTasks);
      } catch (err) {
        console.error('Failed To Get Tasks Array: ' + err);
        alert('Failed To Get Tasks');
        setErrorState({
          active: true,
          title: 'Failed To Get Tasks',
          message: `Failed To Return An Acceptable Tasks Array ::\n${err}`,
        });
      }
    };
    fetchTasks();
  }, [navigate, appState, account, errorState, setErrorState]);

  return (
    <div className="mt-12 flex w-full flex-1 flex-col">
      <div className="items-center justify-center border-6 bg-fuchsia-700 py-10 text-2xl font-bold">
        <h2>Tasks</h2>
      </div>
      <div className="mt-10 mb-20 flex w-11/12 flex-col self-center">
        <div id="home-container">
          <div
            id="tasks-info-container"
            className="rounded-2xl border-2 border-blue-600 py-5"
          >
            <div id="tasks-info">
              <h2>Tasks Information:</h2>
            </div>
            <div
              id="tasks-info-buttons"
              className="flex flex-row justify-center gap-x-5"
            >
              <button onClick={() => navigate(-1)}>Back</button>
              <button onClick={() => navigate('/create-task')}>New Task</button>
            </div>
          </div>
          <div
            id="tasks-container"
            className="mt-10 mb-10 rounded-l border-2 border-blue-600 py-5"
          >
            <div>
              <div className="flex flex-col items-center justify-center">
                <div
                  id="recent-tasks-text"
                  className="w-11/12 border-2 border-blue-400 py-3"
                >
                  <h2 className="font-bold">All Tasks:</h2>
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
                  <tbody>
                    {tasks.map((task: Task) => (
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
                              if (
                                account?.username !== task?.username &&
                                !account?.admin
                              ) {
                                alert(
                                  'You Do Not Have Permission To Delete This Task'
                                );
                                return;
                              }
                              handleDelete(task.id!);
                            }}
                            className="w-3/5 self-center text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
