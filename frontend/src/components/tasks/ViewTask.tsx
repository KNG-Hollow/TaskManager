import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseAppState, UseErrorState } from '../../context/Context';
import { GetTask } from '../utility/ApiServices';
import type { Task } from '../utility/Interfaces';

// TODO Only Allow Users To Delete Their Own Tasks

export default function ViewTask() {
  const navigate = useNavigate();
  const { appState } = UseAppState();
  const { errorState, setErrorState } = UseErrorState();
  const location = useLocation();
  const taskId: number = location.state?.id;
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    if (!appState?.active || errorState?.active) {
      navigate('/error');
    }

    const fetchTask = async (id: number) => {
      let successful = false;

      try {
        const [fetchSuccessful, fetchedTask] = await GetTask(id);
        successful = fetchSuccessful;
        if (!successful) {
          throw new Error('Failed To Get Tasks array');
        }
        setTask(fetchedTask);
      } catch (err) {
        console.error(`Failed To Get Task ${taskId}: ` + err);
        alert(`Failed To Get Task: ${taskId}`);
        setErrorState({
          active: true,
          title: 'Failed To Get Task!',
          message: `Failed To Return An Acceptable Task Object With ID [${id}] :: ${err}`,
        });
      }
    };
    fetchTask(taskId);
  }, [navigate, appState, errorState, setErrorState, taskId]);

  return (
    <div className="mt-12 w-full flex-1 flex-col">
      <div className="mt-15 flex flex-col items-center justify-center gap-x-3">
        <h1>Title:</h1>
        <h1 className="mt-2 pb-3 text-xl font-extrabold">{task?.name}</h1>
      </div>
      <div className="mt-15 mb-20">
        <div>
          <div className="text-l mt-3 flex flex-row justify-center gap-x-10">
            <div className="flex flex-row gap-x-3">
              <h2>Created By:</h2>
              <h2 className="font-bold">{task?.username}</h2>
            </div>
            <div className="flex flex-row gap-x-3">
              <h2>Time Created:</h2>
              <h2 className="font-bold">{task?.created.toLocaleString()}</h2>
            </div>
            <div className="flex flex-row gap-x-3">
              <h2>Active:</h2>
              <h2 className="font-bold">{task?.active ? 'YES' : 'NO'}</h2>
            </div>
          </div>
        </div>
        <div className="mt-15">
          <p>Description:</p>
          <div className="mt-4">
            <p>{task?.description.trim() === '' ? 'N/A' : task?.description}</p>
          </div>
        </div>
        <div
          id="button-container"
          className="mt-10 flex flex-col justify-center gap-y-5"
        >
          <button onClick={() => navigate(`/tasks/${task?.id}`)}>
            Edit Task
          </button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}
