import axios, { HttpStatusCode } from 'axios';
import type { Account, Task, JwtObject, JwtResponse } from './Interfaces';
import { jwtDecode } from 'jwt-decode';

// TODO Add APIHOST ENV
//const apiHost: string = 'https://192.168.0.77:8443/api';
const apiHost: string =
  import.meta.env.VITE_API_URL || 'https://localhost:8443/api';

const api = axios.create({
  baseURL: apiHost,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const decodeToken = (token: string): JwtObject | null => {
  try {
    return jwtDecode<JwtObject>(token);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export async function AuthorizeUserJWT(
  username: string,
  password: string
): Promise<[boolean, string, JwtObject]> {
  let exists: boolean;
  let jwtPayload: JwtObject = {} as JwtObject;
  let token: string;

  try {
    const response = await axios.post<JwtResponse>(
      apiHost + '/login',
      {
        username,
        password,
      },
      {
        //withCredentials: true,
      }
    );
    console.log('Raw Response: ', response);
    if (response.status !== HttpStatusCode.Ok) {
      exists = false;
      throw new Error('Response Status: Unsuccessful');
    }
    if (response.data === null) {
      exists = false;
      throw new Error('Authorization Failed / User Does Not Exist');
    }

    exists = true;
    token = response.data.access_token;
    jwtPayload = decodeToken(token)!;
    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        console.error('Request Interceptor Error:', error);
        return Promise.reject(error);
      }
    );

    return [exists, token, jwtPayload];
  } catch (err) {
    console.error(err);
    alert(`Error: ${err}`);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}

export async function AuthorizeUser(
  username: string,
  password: string
): Promise<[boolean, Account]> {
  let exists: boolean;
  let account: Account = {} as Account;

  try {
    const response = await axios.post<Account>(
      apiHost + '/login',
      {
        username,
        password,
      },
      {
        //withCredentials: true,
      }
    );
    console.log('Raw Response: ', response);
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

// TODO Fix Logout Service
export async function LogoutBackend(): Promise<void> {
  try {
    console.log('Attempting to logout of API Services...');
    const response = await api.post(apiHost + '/auth/logout');
    console.log('Raw Response: ', response);
    if (response.status !== HttpStatusCode.Ok) {
      console.error('Response Not: OK!');
      throw new Error('Response Status: Unsuccessful');
    }

    return console.log('Successfully Logged Out!');
  } catch (err) {
    console.error(err);
    alert('Failed To Logout Of Server: Please Refresh Or Close Your Tab');
  }
}

// TODO Add Health Check To /api/health

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
    const response = await api.post<Account>(
      apiHost + '/auth/accounts',
      {
        id: newAccount.id,
        name: newAccount.name,
        username: newAccount.username,
        password: newAccount.password,
        admin: newAccount.admin,
        active: newAccount.active,
      },
      {
        // withCredentials: true,
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
    const response = await api.post<Task>(
      apiHost + '/auth/tasks',
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
    const response = await api.get<Account[]>(apiHost + '/auth/accounts', {
      //withCredentials: true,
    });
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
    const response = await api.get<Task[]>(apiHost + '/auth/tasks', {
      //withCredentials: true,
    });
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
  initiatorAccount: JwtObject,
  id: number
): Promise<[boolean, Account]> {
  let received: boolean;
  let account: Account;

  try {
    console.log(`Attempting To Get Account [${id}] ...`);
    if (initiatorAccount.id !== id && !initiatorAccount.admin) {
      received = false;
      alert('You Do Have Have Permission To View This Account');
      throw new Error("Initiator's Account Is Not Privileged");
    }
    const response = await api.get<Account>(apiHost + `/auth/accounts/${id}`, {
      //withCredentials: true,
    });
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
    const response = await api.get<Task>(apiHost + `/auth/tasks/${id}`, {
      //withCredentials: true,
    });
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
    const response = await api.put<Account>(
      apiHost + `/auth/accounts/${id}`,
      {
        id: newAccount.id,
        name: newAccount.name,
        username: newAccount.username,
        password: newAccount.password,
        admin: newAccount.admin,
        active: newAccount.active,
      },
      {
        //withCredentials: true,
      }
    );
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
    const response = await api.put<Task>(
      apiHost + `/auth/tasks/${id}`,
      {
        id: id,
        name: newTask.name,
        description: newTask.description,
        created: newTask.created,
        username: newTask.username,
        active: newTask.active,
      },
      {
        //withCredentials: true,
      }
    );
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
    const response = await api.delete<number>(
      apiHost + `/auth/accounts/${id}`,
      {
        //withCredentials: true,
      }
    );
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
    const response = await api.delete<number>(apiHost + `/auth/tasks/${id}`, {
      //withCredentials: true,
    });
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
