import axios, { HttpStatusCode } from 'axios';
import type { Account, Task } from './Interfaces';

const apiHost: string = 'http://localhost:8081/api';

export async function AuthorizeUser(
  username: string,
  password: string
): Promise<[boolean, Account]> {
  let exists: boolean;
  let account: Account = {} as Account;

  try {
    const response = await axios.post<Account>(
      apiHost + '/auth',
      {
        username,
        password,
      },
      {
        //withCredentials: true,
      }
    );
    if (response.status !== HttpStatusCode.Ok) {
      exists = false;
      throw new Error('Response Status: Unsuccessful');
    }
    if (response.data.active !== true) {
      exists = false;
      throw new Error('User Does Not Exist');
    }
    exists = true;
    account = response.data;
    return [exists, account];
  } catch (err) {
    console.error(err);
    alert(`Error: ${err}`);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}

export async function CreateTask(
  account: Account,
  title: string,
  description: string
): Promise<[boolean, HttpStatusCode]> {
  let successful: boolean;
  const timestamp = new Date().toISOString();
  const username = account.username;
  const active = true;
  const task: Task = {
    id: null,
    name: title,
    description: description,
    created: timestamp,
    username: username,
    active: active,
  };

  try {
    const response = await axios.post<Task>(
      apiHost + '/tasks',
      {
        id: task.id,
        name: task.name,
        description: task.description,
        created: task.created,
        username: task.username,
        active: task.active,
      },
      {
        //withCredentials: true,
      }
    );
    if (response.status !== HttpStatusCode.Created) {
      console.error('Http Status Code Is Not [Created]: ' + response.status);
      successful = false;
      throw new Error('Unexpected Response Status');
    }
    console.log('Raw Response Data: ' + response.data);
    successful = true;
    return [successful, response.status];
  } catch (err) {
    console.error(err);
    alert(`Error: Failed To Create Task: ${err}`);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}

export async function GetTasks(): Promise<[boolean, Task[]]> {
  let received: boolean;
  let tasks: Task[];

  try {
    const response = await axios.get<Task[]>(apiHost + '/tasks');
    const data = response.data;
    console.log('Raw API Response: ', data);
    if (response.status !== HttpStatusCode.Ok) {
      received = false;
      throw new Error('Response Status: Unsuccessful');
    }
    received = true;
    tasks = data;
    return [received, tasks];
  } catch (err) {
    console.error(err);
    alert('Error: Failed To Get Tasks...' + err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}

export async function GetTask(id: number): Promise<[boolean, Task]> {
  let received: boolean;
  let task: Task;

  try {
    const response = await axios.get<Task>(apiHost + `/tasks/${id}`);
    const data = response.data;
    console.log('Raw API Response: ', data);
    if (response.status !== HttpStatusCode.Ok) {
      received = false;
      throw new Error("Response Status: NOT 'OK'");
    }
    received = true;
    task = data;
    return [received, task];
  } catch (err) {
    console.error(err);
    alert(`Error: Failed To Get Task [${id}]: ` + err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}

export async function UpdateTask(
  id: number,
  newTask: Task
): Promise<[boolean, Task]> {
  let success: boolean;

  try {
    if (id !== newTask.id) {
      console.error(
        `Input ID and New Task's ID Do Not Match:\n\tInput: ${id}, Task: ${newTask.id}`
      );
      throw new Error(
        `Input ID and New Task's ID Do Not Match:\n\tInput: ${id}, Task: ${newTask.id}`
      );
    }
    const response = await axios.put<Task>(apiHost + `/tasks/${id}`, {
      id: id,
      name: newTask.name,
      description: newTask.description,
      created: newTask.created,
      username: newTask.username,
      active: newTask.active,
    });
    const taskData = response.data;
    console.log('Raw API Response: ', taskData);
    if (response.status !== HttpStatusCode.Accepted) {
      success = false;
      throw new Error(`Unexpected Response Status`);
    }
    success = true;
    return [success, taskData];
  } catch (err) {
    console.error(err);
    alert(`Error: Failed To Update Task [${id}]: ` + err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}

export async function DeleteTask(id: number): Promise<[boolean, number]> {
  let success: boolean;

  try {
    const response = await axios.delete<number>(apiHost + `/tasks/${id}`);
    const data = response.data;
    console.log('Raw API Response: ', data);
    if (response.status !== HttpStatusCode.Accepted) {
      success = false;
      throw new Error('Unexpected Response Status!');
    }
    success = true;
    return [success, data];
  } catch (err) {
    console.error(err);
    alert(`Error: Failed To Get Task [${id}]: ` + err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}
