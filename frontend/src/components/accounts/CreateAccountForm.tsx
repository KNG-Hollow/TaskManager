import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAccount, UseAppState, UseErrorState } from '../../context/Context';
import { CreateAccount } from '../utility/ApiServices';
import type { Account } from '../utility/Interfaces';

// TODO Only Allow Admin Accounts To Create Accounts

export default function CreateAccountForm() {
  const navigate = useNavigate();
  const { appState } = UseAppState();
  const { account } = UseAccount();
  const { setErrorState } = UseErrorState();
  const [nameIn, setNameValue] = useState<string>();
  const [usernameIn, setUsernameValue] = useState<string>();
  const [passwordIn, setPasswordValue] = useState<string>();
  const [adminIn, setAdminValue] = useState<boolean>(false);

  const handleCreateAccount = async () => {
    let success: boolean;
    let responseAccount: Account;
    const updatedAccount: Account = {
      id: null,
      name: nameIn!,
      username: usernameIn!,
      password: passwordIn!,
      admin: adminIn!,
      active: true,
    };

    if (!appState?.active || !account?.admin) {
      alert('You Are Not Allowed To Create Accounts');
      return;
    }
    if (updatedAccount.name.trim() === '') {
      alert('Name Cannot Be Empty!');
      return;
    }
    if (updatedAccount.username.trim() === '') {
      alert('Username Cannot Be Empty!');
      return;
    } else if (updatedAccount.password.trim() === '') {
      alert('Password Cannot Be Empty!');
      return;
    }

    console.log('Attempting To Create Account...');
    try {
      [success, responseAccount] = await CreateAccount(
        account,
        null,
        updatedAccount.name,
        updatedAccount.username,
        updatedAccount.password,
        updatedAccount.admin
      );
      if (!success || responseAccount === null) {
        console.error(
          `success: ${success ? 'True' : 'False'} , account: ${responseAccount}`
        );
        throw new Error('Create Account Had Unexpected Response Values!');
      }
      console.log(
        `success: ${success ? 'True' : 'False'} , account: ${responseAccount}`
      );
      navigate(-1);
    } catch (err) {
      console.error('ApiService Failed To Create Account: ' + err);
      setErrorState({
        active: true,
        title: 'Api Service Failure',
        message: `Failed To Populate The Database And Get A Successful Response ::\n${err}`,
      });
      throw new Error('ApiService Failed To Create Account: ' + err);
    }
  };

  useEffect(() => {
    if (!appState?.active || !appState?.admin || !account?.admin) {
      navigate('/error');
    }
  }, [navigate, appState, account?.id, account?.admin]);

  return (
    <div className="mt-12 w-full flex-1">
      <div className="items-center justify-center border-6 bg-fuchsia-700 py-10 text-2xl font-bold">
        <h2>Create Account</h2>
      </div>
      <div className="mt-15 mb-20 flex flex-col justify-center">
        <div id="create-account-container" className="flex justify-center">
          <div
            id="create-account-form"
            className="flex flex-col items-center gap-y-3"
          >
            <div
              id="input-name"
              className="relative right-3 flex flex-row items-center gap-x-3"
            >
              <label htmlFor="nameContent" className="font-extrabold">
                Name:
              </label>
              <input
                name="nameContent"
                className="rounded-sm border-2 border-fuchsia-600 text-center"
                aria-label="name"
                placeholder="..."
                value={nameIn}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </div>
            <div
              id="input-username"
              className="relative right-7 flex flex-row items-center gap-x-3"
            >
              <label htmlFor="usernameContent" className="font-extrabold">
                Username:
              </label>
              <input
                className="rounded-sm border-2 border-fuchsia-600 text-center"
                aria-label="username"
                placeholder="..."
                value={usernameIn}
                onChange={(e) => setUsernameValue(e.target.value)}
              />
            </div>
            <div
              id="input-password"
              className="relative right-6 flex flex-row items-center gap-x-3"
            >
              <label htmlFor="passwordContent" className="font-extrabold">
                Password:
              </label>
              <input
                name="passwordContent"
                className="rounded-sm border-2 border-fuchsia-600 text-center"
                aria-label="password"
                placeholder="..."
                value={passwordIn}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </div>
            <div
              id="input-admin"
              className="relative right-5 flex flex-row items-center gap-x-3"
            >
              <label htmlFor="adminContent" className="font-extrabold">
                Admin:
              </label>
              <label className="flex flex-row gap-x-2">
                <input
                  type="radio"
                  value="Yes"
                  checked={adminIn === true}
                  onChange={() => setAdminValue(true)}
                />
                Yes
              </label>
              <label className="flex flex-row gap-x-2">
                <input
                  type="radio"
                  value="No"
                  checked={adminIn === false}
                  onChange={() => setAdminValue(false)}
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div
          id="create-account-buttons"
          className="mt-5 flex flex-col items-center justify-center gap-y-2"
        >
          <button onClick={handleCreateAccount}>Create Account</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}
