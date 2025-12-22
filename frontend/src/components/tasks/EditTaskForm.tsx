import { useLocation, useNavigate } from 'react-router-dom';
import { UseAppState, UseAccount, UseErrorState } from '../../context/Context';
import { useEffect, useState } from 'react';
import type { Task } from '../utility/Interfaces';
import { UpdateTask } from '../utility/ApiServices';

export default function EditTaskForm() {
  const navigate = useNavigate();
  const { appState } = UseAppState();
  const { account } = UseAccount();
  const { setErrorState } = UseErrorState();
  const [isTaskActive, setIsTaskActive] = useState<boolean>();
  const location = useLocation();
  const task: Task = location.state?.task;
  const [titleIn, setTitleValue] = useState<string>(task.name);
  const [descriptionIn, setDescriptionValue] = useState<string>(
    task.description
  );

  const handleUpdateTask = async () => {
    let success: boolean;
    let taskResponse: Task;
    const updatedTask: Task = {
      id: task.id,
      name: titleIn,
      description: descriptionIn,
      created: task.created,
      username: task.username,
      active: isTaskActive!,
    };

    if (account?.username !== task.username && !account?.admin) {
      alert('You Are Not Allowed To Edit This Task');
      return;
    }
    if (titleIn.trim() === '') {
      alert('Title Cannot Be Empty!');
      return;
    } else if (titleIn.length > 60) {
      alert('Title Cannot Be More Than 60 Characters');
      return;
    }

    console.log('Attempting To Update Task...');
    try {
      [success, taskResponse] = await UpdateTask(task.id!, updatedTask);
      if (!success || taskResponse === null) {
        console.error(
          `success: ${success ? 'True' : 'False'} , taskResponse: ${taskResponse}`
        );
        throw new Error('CreateTask() Response Has Unexpected Values!');
      }
      console.log(
        `success: ${success ? 'True' : 'False'} , taskResponse: ${taskResponse}`
      );
      navigate(-1);
    } catch (err) {
      console.error('ApiService Failed To Update Task: ' + err);
      setErrorState({
        active: true,
        title: 'Api Service Failure',
        message: `Failed To Populate The Database And Get A Successful Response ::\n${err}`,
      });
      throw new Error('ApiService Failed To Update Task: ' + err);
    }
  };

  useEffect(() => {
    if (!appState?.active) {
      navigate('/error');
    }
    if (account?.username !== task.username && !account?.admin) {
      navigate(-1);
    }
  }, [
    navigate,
    appState,
    isTaskActive,
    account?.username,
    account?.admin,
    task.username,
  ]);

  return (
    <div className="mt-12 w-full flex-1">
      <div className="items-center justify-center border-6 bg-fuchsia-700 py-10 text-2xl font-bold">
        <h2>Edit Task</h2>
      </div>
      <div className="mt-15 mb-20 flex flex-col justify-center">
        <div id="create-task-container" className="flex justify-center">
          <div
            id="create-task-form"
            className="flex flex-col items-center gap-y-3"
          >
            <div
              id="input-title"
              className="flex flex-row items-center gap-x-3"
            >
              <label htmlFor="titleContent" className="font-extrabold">
                Title:
              </label>
              <textarea
                name="titleContent"
                className="rounded-sm border-2 border-fuchsia-600 text-center"
                aria-label="title"
                cols={30}
                placeholder="..."
                value={titleIn}
                onChange={(e) => setTitleValue(e.target.value)}
              />
            </div>
            <div
              id="input-description"
              className="relative right-7 flex flex-row items-center gap-x-3"
            >
              <label htmlFor="description-area" className="font-extrabold">
                Description:
              </label>
              <textarea
                className="rounded-sm border-2 border-fuchsia-600 text-center"
                aria-label="description"
                wrap="soft"
                rows={6}
                cols={30}
                placeholder="..."
                value={descriptionIn}
                onChange={(e) => setDescriptionValue(e.target.value)}
              />
            </div>
            <div
              id="active-state"
              className="flex flex-row justify-center gap-x-5 font-bold"
            >
              <h2>Status:</h2>
              {isTaskActive ? (
                <h2 className="text-green-600">Active</h2>
              ) : (
                <h2 className="text-red-700">Inactive</h2>
              )}
            </div>
          </div>
        </div>
        <div
          id="create-task-buttons"
          className="mt-5 flex flex-col items-center justify-center gap-y-2"
        >
          <button
            onClick={() => {
              return isTaskActive
                ? setIsTaskActive(false)
                : setIsTaskActive(true);
            }}
          >
            {isTaskActive ? 'Deactivate' : 'Activate'}
          </button>
          <button onClick={handleUpdateTask}>Update</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}
