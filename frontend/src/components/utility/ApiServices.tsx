import axios, { HttpStatusCode } from 'axios';
import { type Account } from './Interfaces';

export async function AuthorizeUser(
  username: string,
  password: string
): Promise<[boolean, Account]> {
  let exists: boolean = false;
  let account: Account = {} as Account;

  try {
    const response = await axios.post<Account>(
      'http://localhost:8081/api/auth',
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
    exists = true;
    account = response.data;
    return [exists, account];
  } catch (err) {
    console.error(err);
    throw new Error('Failed To Query RESTapi: ' + err);
  }
}
