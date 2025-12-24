import axios, { HttpStatusCode } from 'axios';
import type { Account, Task } from './Interfaces';

// TODO Add Password Encryption

const apiHost: string = 'https://192.168.0.77:8443/api';

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

export async function CreateAccount(
  initiatorAccount: Account,
  id: number | null,
  name: string,
  username: string,
  password: string,
  admin: boolean
): Promise<[boolean, Account]> {
  let successful: boolean;
  const newAccount: Account = {
    id: id,
    name: name,
    username: username,
    password: password,
    admin: admin,
    active: true,
  };

  try {
    if (!initiatorAccount.admin) {
      successful = false;
      alert('You Do Have Have Permission To Create An Account');
      throw new Error("Initiator's Account Is Not Privileged");
    }
    const response = await axios.post<Account>(
      apiHost + '/accounts',
      {
        id: newAccount.id,
        name: newAccount.name,
        username: newAccount.username,
        password: newAccount.password,
        admin: newAccount.admin,
        active: newAccount.active,
      },
      {
        // withCredentials: true;
      }
    );
    if (response.status !== HttpStatusCode.Created) {
      console.error('Http Status Code Is Not [Created]: ' + response.status);
      successful = false;
      throw new Error('Unexpected Response Status');
    }
    console.log('Raw Response Data: ' + response.data);
    successful = true;
    return [successful, response.data];
  } catch (err) {
    console.error(err);
    alert(`Error: Failed To Create Account: ${err}`);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}

export async function CreateTask(
  account: Account,
  id: number | null,
  title: string,
  description: string
): Promise<[boolean, Task]> {
  let successful: boolean;
  const timestamp = new Date().toISOString();
  const username = account.username;
  const active = true;
  const task: Task = {
    id: id,
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
    return [successful, response.data];
  } catch (err) {
    console.error(err);
    alert(`Error: Failed To Create Task: ${err}`);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}

export async function GetAccounts(
  initiatorAccount: Account
): Promise<[boolean, Account[]]> {
  let received: boolean;
  let accounts: Account[];

  try {
    if (!initiatorAccount.admin) {
      received = false;
      alert('You Do Have Have Permission To View All Accounts');
      throw new Error("Initiator's Account Is Not Privileged");
    }
    const response = await axios.get<Account[]>(apiHost + '/accounts');
    const data = response.data;
    console.log('Raw API Response: ', data);
    if (response.status !== HttpStatusCode.Ok) {
      received = false;
      throw new Error("Response Status: NOT 'Ok'");
    }
    received = true;
    accounts = data;
    return [received, accounts];
  } catch (err) {
    console.error(err);
    alert('Error: Failed To Get Accounts!: ' + err);
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
    alert('Error: Failed To Get Tasks!: ' + err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}

export async function GetAccount(
  initiatorAccount: Account,
  id: number
): Promise<[boolean, Account]> {
  let received: boolean;
  let account: Account;

  try {
    if (initiatorAccount.id !== id && !initiatorAccount.admin) {
      received = false;
      alert('You Do Have Have Permission To View This Account');
      throw new Error("Initiator's Account Is Not Privileged");
    }
    const response = await axios.get<Account>(apiHost + `/accounts/${id}`);
    const data = response.data;
    console.log('Raw API Response: ', data);
    if (response.status !== HttpStatusCode.Ok) {
      received = false;
      throw new Error("Response Status: NOT 'OK'");
    }
    received = true;
    account = data;
    return [received, account];
  } catch (err) {
    console.error(err);
    alert(`Error: Failed To Get Account [${id}]: ` + err);
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

export async function UpdateAccount(
  id: number,
  initiatorAccount: Account,
  newAccount: Account
): Promise<[boolean, Account]> {
  let success: boolean;

  try {
    if (initiatorAccount.id !== id && !initiatorAccount.admin) {
      success = false;
      alert('You Do Have Have Permission To Update This Account');
      throw new Error("Initiator's Account Is Not Privileged");
    }
    if (id !== newAccount.id && !initiatorAccount.admin) {
      console.error(
        `Input ID and New Account's ID Do Not Match:\n\tInput: ${id}, Account: ${newAccount.id}`
      );
      throw new Error(
        `Input ID and New Account's ID Do Not Match:\n\tInput: ${id}, Account: ${newAccount.id}`
      );
    }
    const response = await axios.put<Account>(apiHost + `/accounts/${id}`, {
      id: newAccount.id,
      name: newAccount.name,
      username: newAccount.username,
      password: newAccount.password,
      admin: newAccount.admin,
      active: newAccount.active,
    });
    const accountData = response.data;
    console.log('Raw API Response: ', accountData);
    if (response.status !== HttpStatusCode.Accepted) {
      success = false;
      throw new Error(`Unexpected Response Status`);
    }
    success = true;
    return [success, accountData];
  } catch (err) {
    console.error(err);
    alert(`Error: Failed To Update Account [${id}]: ` + err);
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

export async function DeleteAccount(
  initiatorAccount: Account,
  id: number
): Promise<[boolean, number]> {
  let success: boolean;

  try {
    if (initiatorAccount.id !== id && !initiatorAccount.admin) {
      success = false;
      alert('You Do Have Have Permission To Update This Account');
      throw new Error("Initiator's Account Is Not Privileged");
    }
    const response = await axios.delete<number>(apiHost + `/accounts/${id}`);
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
    alert(`Error: Failed To Delete Account [${id}]: ` + err);
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
    alert(`Error: Failed To Delete Task [${id}]: ` + err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}
