import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAccount, UseAppState, UseErrorState } from '../../context/Context';
import { GetAccounts } from '../utility/ApiServices';
import type { Account } from '../utility/Interfaces';

export default function Accounts() {
  const { account } = UseAccount();
  const { appState } = UseAppState();
  const { errorState, setErrorState } = UseErrorState();
  const navigate = useNavigate();
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);

  /*
  const handleDelete = async (id: number) => {
    let successful: boolean;

    try {
      console.log('Attempting To Delete Account With ID: ' + id);
      const [deleteSuccessful, accountId] = await DeleteAccount(account!, id);
      successful = deleteSuccessful;
      if (!successful) {
        throw new Error('Failed To Delete Account');
      }
      console.log('Successfully Deleted Account With ID: ' + accountId);
      const updatedArray = allAccounts.filter(
        (account) => account.id !== accountId
      );
      setAllAccounts(updatedArray);
      alert('Successfully Deleted Account With ID: ' + accountId);
    } catch (err) {
      console.error(
        `API Service Failed To Delete Account With ID [${id}]:\n${err}`
      );
      alert('Failed To Delete Account');
      setErrorState({
        active: true,
        title: 'Failed To Delete Account!',
        message: `API Service Failed To Delete Account With ID [${id}]:\n${err}`,
      });
    }
  };
  */

  useEffect(() => {
    if (errorState?.active || !appState?.active || !appState?.admin) {
      navigate('/error');
    }
    const fetchAccounts = async () => {
      let successful = false;

      try {
        const [fetchSuccessful, fetchedAccounts] = await GetAccounts(account!);
        successful = fetchSuccessful;
        if (!successful) {
          throw new Error('Failed To Get Accounts array');
        }
        setAllAccounts(fetchedAccounts);
      } catch (err) {
        console.error('Failed To Get Accounts Array: ' + err);
        alert('Failed To Get Accounts');
        setErrorState({
          active: true,
          title: 'Failed To Get Accounts',
          message: `Failed To Return An Acceptable Accounts Array ::\n${err}`,
        });
      }
    };
    fetchAccounts();
  }, [
    account,
    appState?.active,
    appState?.admin,
    errorState?.active,
    navigate,
    setErrorState,
  ]);

  return (
    <div className="mt-12 flex w-full flex-1 flex-col">
      <div className="items-center justify-center border-6 bg-fuchsia-700 py-10 text-2xl font-bold">
        <h2>Accounts</h2>
      </div>
      <div className="mt-10 mb-20 flex w-11/12 flex-col self-center">
        <div id="home-container">
          <div
            id="tasks-info-container"
            className="rounded-2xl border-2 border-blue-600 py-5"
          >
            <div id="tasks-info">
              <h2>Accounts Information:</h2>
            </div>
            <div
              id="tasks-info-buttons"
              className="flex flex-row justify-center gap-x-5"
            >
              <button onClick={() => navigate(-1)}>Back</button>
              <button onClick={() => navigate('/create-account')}>
                New Account
              </button>
            </div>
          </div>
          <div
            id="tasks-container"
            className="mt-10 mb-10 rounded-l border-2 border-blue-600 py-5"
          >
            <div>
              <div className="flex flex-col items-center justify-center">
                <div
                  id="recent-tasks-text"
                  className="w-11/12 border-2 border-blue-400 py-3"
                >
                  <h2 className="font-bold">All Accounts:</h2>
                </div>
              </div>
              <div className="mt-5 flex flex-col items-center justify-center">
                <table className="w-11/12">
                  <thead>
                    <tr>
                      <th>Name:</th>
                      <th>Username:</th>
                      <th>Password:</th>
                      <th>Admin:</th>
                      <th>Active:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAccounts.map((mapAccount: Account) => (
                      <tr
                        key={mapAccount.id}
                        className="border-2 border-blue-400"
                      >
                        <td>{mapAccount.name}</td>
                        <td>{mapAccount.username}</td>
                        <td>{mapAccount.password}</td>
                        {mapAccount.admin ? (
                          <td className="text-amber-300">True</td>
                        ) : (
                          <td>False</td>
                        )}
                        {mapAccount.active ? (
                          <td className="text-green-600">Yes</td>
                        ) : (
                          <td className="text-red-700">No</td>
                        )}
                        <td
                          id="recent-tasks-buttons"
                          className="flex flex-row border-l-2 border-blue-400"
                        >
                          <button
                            className="w-full self-center text-fuchsia-500"
                            onClick={() => {
                              navigate(`/accounts/${mapAccount.id}`, {
                                state: { id: mapAccount.id },
                              });
                            }}
                          >
                            View
                          </button>
                          {/*
                          <button
                            onClick={() => {
                              if (
                                account?.username !== mapAccount?.username &&
                                !account?.admin
                              ) {
                                alert(
                                  'You Do Not Have Permission To Delete This Account'
                                );
                                return;
                              }
                              handleDelete(mapAccount.id!);
                            }}
                            className="w-3/5 self-center text-red-700"
                          >
                            Delete
                          </button>
                          */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
