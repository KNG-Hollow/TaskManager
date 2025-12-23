import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAppState, UseAccount, UseErrorState } from '../../context/Context';
import { CreateTask } from '../utility/ApiServices';
import type { Task } from '../utility/Interfaces';

export default function CreateTaskForm() {
  const navigate = useNavigate();
  const { appState } = UseAppState();
  const { errorState, setErrorState } = UseErrorState();
  const { account } = UseAccount();
  const [titleIn, setTitleValue] = useState<string>('');
  const [descriptionIn, setDescriptionValue] = useState<string>('');

  const handleCreateTask = async () => {
    let success: boolean;
    let responseTask: Task;

    if (titleIn.trim() === '') {
      alert('Title Cannot Be Empty!');
      return;
    } else if (titleIn.length > 60) {
      alert('Title Cannot Be More Than 60 Characters');
      return;
    }

    console.log('Attempting To Create Task...');
    try {
      [success, responseTask] = await CreateTask(
        account!,
        null,
        titleIn,
        descriptionIn
      );
      if (!success || responseTask === null) {
        console.error(
          `success: ${success ? 'True' : 'False'} , task: ${responseTask.valueOf()}`
        );
        throw new Error('CreateTask() Response Has Unexpected Values!');
      }
      console.log(
        `success: ${success ? 'True' : 'False'} , task: ${responseTask.valueOf()}`
      );
      navigate('/home');
    } catch (err) {
      console.error('ApiService Failed To Create Task: ' + err);
      setErrorState({
        active: true,
        title: 'Api Service Failure',
        message: `Failed To Populate The Database And Get A Successful Response ::\n${err}`,
      });
      throw new Error('ApiService Failed To Create Task: ' + err);
    }
  };

  useEffect(() => {
    if (!appState?.active || errorState?.active) {
      navigate('/error');
    }
  }, [navigate, appState, errorState]);

  return (
    <div className="mt-12 w-full flex-1">
      <div className="items-center justify-center border-6 bg-fuchsia-700 py-10 text-2xl font-bold">
        <h2>Create Task</h2>
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
          </div>
        </div>
        <div
          id="create-task-buttons"
          className="mt-5 flex flex-col items-center justify-center gap-y-2"
        >
          <button onClick={handleCreateTask}>Create Task</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}
