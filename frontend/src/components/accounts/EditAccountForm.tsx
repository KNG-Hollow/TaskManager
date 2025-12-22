import { useLocation, useNavigate } from 'react-router-dom';
import { UseAccount, UseAppState, UseErrorState } from '../../context/Context';
import { useEffect, useState } from 'react';
import type { Account } from '../utility/Interfaces';
import { UpdateAccount } from '../utility/ApiServices';

export default function EditAccountForm() {
  const navigate = useNavigate();
  const { appState } = UseAppState();
  const { account } = UseAccount();
  const location = useLocation();
  const locationId: number = location.state?.id;
  const { setErrorState } = UseErrorState();
  const passedAccount: Account = location.state?.account;
  const [usernameIn, setUsernameValue] = useState<string>(
    passedAccount.username
  );
  const [passwordIn, setPasswordValue] = useState<string>(
    passedAccount.password
  );
  const [adminIn, setAdminValue] = useState<boolean>(passedAccount.admin);
  const [activeIn, setActiveValue] = useState<boolean>(passedAccount.active);

  const handleUpdateAccount = async () => {
    let success: boolean;
    let accountResponse: Account;
    const updatedAccount: Account = {
      id: passedAccount.id,
      name: passedAccount.name,
      username: usernameIn,
      password: passwordIn,
      admin: adminIn,
      active: activeIn,
    };

    if (account?.id !== passedAccount.id && !account?.admin) {
      alert('You Are Not Allowed To Edit This Account');
      return;
    }
    if (updatedAccount.username.trim() === '') {
      alert('Username Cannot Be Empty!');
      return;
    } else if (updatedAccount.password.trim() === '') {
      alert('Password Cannot Be Empty!');
      return;
    }

    console.log('Attempting To Update Account...');
    try {
      [success, accountResponse] = await UpdateAccount(
        passedAccount.id!,
        account,
        updatedAccount
      );
      if (!success || accountResponse === null) {
        console.error(
          `success: ${success ? 'True' : 'False'} , accountResponse: ${accountResponse}`
        );
        throw new Error('Update Account Had Unexpected Response Values!');
      }
      console.log(
        `success: ${success ? 'True' : 'False'} , accountResponse: ${accountResponse}`
      );
      navigate(-1);
    } catch (err) {
      console.error('ApiService Failed To Update Account: ' + err);
      setErrorState({
        active: true,
        title: 'Api Service Failure',
        message: `Failed To Populate The Database And Get A Successful Response ::\n${err}`,
      });
      throw new Error('ApiService Failed To Update Account: ' + err);
    }
  };

  useEffect(() => {
    if (!appState?.active || (account?.id !== locationId && !account?.admin)) {
      navigate('/error');
    }
  }, [navigate, appState, account?.id, account?.admin, locationId]);

  return (
    <div className="mt-12 w-full flex-1">
      <div className="items-center justify-center border-6 bg-fuchsia-700 py-10 text-2xl font-bold">
        <h2>Edit Account</h2>
      </div>
      <div className="mt-15 mb-20 flex flex-col justify-center">
        <div id="create-account-container" className="flex justify-center">
          <div
            id="create-account-form"
            className="flex flex-col items-center gap-y-3"
          >
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
            <div
              id="active-state"
              className="flex flex-row justify-center gap-x-5 font-bold"
            >
              <h2>Status:</h2>
              {activeIn ? (
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
              return activeIn ? setActiveValue(false) : setActiveValue(true);
            }}
          >
            {activeIn ? 'Deactivate' : 'Activate'}
          </button>
          <div
            id="create-account-buttons"
            className="mt-5 flex flex-col items-center justify-center gap-y-2"
          >
            <button onClick={handleUpdateAccount}>Update</button>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
