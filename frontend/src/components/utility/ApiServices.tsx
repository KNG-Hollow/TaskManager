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
  let successful: boolean;
  let tasks: Task[];

  try {
    const response = await axios.get<Task[]>(apiHost + '/tasks');
    console.log('Raw API Response: ', response.data);
    if (response.status !== HttpStatusCode.Ok) {
      successful = false;
      throw new Error('Response Status: Unsuccessful');
    }
    successful = true;
    tasks = response.data;
    return [successful, tasks];
  } catch (err) {
    console.error(err);
    alert('Error: Failed To Get Tasks...' + err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}
