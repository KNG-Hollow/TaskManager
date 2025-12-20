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
    alert('Error: User Not In Database...');
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

export async function ViewTask(id: number): Promise<[boolean, Task]> {
  let received: boolean;
  let task: Task;

  try {
    const response = await axios.get<Task>(apiHost + `/tasks/${id}`);
    const data = response.data;
    console.log('Raw API Response: ', data);
    if (response.status !== HttpStatusCode.Ok) {
      received = false;
      throw new Error('Response Status: Unsuccessful');
    }
    received = true;
    task = data;
    return [received, task];
  } catch (err) {
    console.error(err);
    alert(`Error: Failed To Get Task [${id}]:` + err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}
