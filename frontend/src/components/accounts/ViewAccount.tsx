import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseAppState, UseAccount, UseErrorState } from '../../context/Context';
import type { Account } from '../utility/Interfaces';
import { DeleteAccount, GetAccount } from '../utility/ApiServices';

export default function Account() {
  const navigate = useNavigate();
  const { appState } = UseAppState();
  const { account } = UseAccount();
  const { setErrorState } = UseErrorState();
  const location = useLocation();
  const locationID: number = location.state?.id;
  const [viewAccount, setViewAccount] = useState<Account | null>();

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

  useEffect(() => {
    if (!appState?.active) {
      navigate('/error');
    }

    const fetchAccount = async (id: number) => {
      let successful = false;

      try {
        const [fetchSuccessful, fetchedAccount] = await GetAccount(
          account!,
          id
        );
        successful = fetchSuccessful;
        if (!successful || fetchedAccount === null) {
          throw new Error('Failed To Get Account');
        }
        setViewAccount(fetchedAccount);
      } catch (err) {
        console.error(`Failed To Get Account ${id}: ` + err);
        alert(`Failed To Get Account: ${id}`);
        setErrorState({
          active: true,
          title: 'Failed To Get Account!',
          message: `Failed To Return An Acceptable Account Object With ID [${viewAccount?.id}] :: ${err}`,
        });
      }
    };
    if (!appState?.admin || !account?.admin) {
      setViewAccount(account);
    } else {
      fetchAccount(locationID);
    }
  }, [
    account,
    appState?.active,
    appState?.admin,
    locationID,
    navigate,
    setErrorState,
    viewAccount?.id,
  ]);

  return (
    <div className="mt-12 w-full flex-1 flex-col">
      <div className="mt-15 flex flex-col items-center justify-center gap-x-3">
        <h1>Name:</h1>
        <h1 className="mt-2 pb-3 text-xl font-extrabold">
          {viewAccount?.name}
        </h1>
      </div>
      <div className="mt-15 mb-20">
        <div>
          <div className="text-l mt-3 flex flex-row justify-center gap-x-10">
            <div className="flex flex-row gap-x-3">
              <h2>Username:</h2>
              <h2 className="font-bold">{viewAccount?.username}</h2>
            </div>
            <div className="flex flex-row gap-x-3">
              <h2>Password:</h2>
              <h2 className="font-bold">{viewAccount?.password}</h2>
            </div>
            <div className="flex flex-row gap-x-3">
              <h2>Admin:</h2>
              <h2 className="font-bold">{viewAccount?.admin ? 'YES' : 'NO'}</h2>
            </div>
          </div>
        </div>
        <div
          id="button-container"
          className="mt-10 flex flex-col items-center justify-center gap-y-5"
        >
          {viewAccount?.username === account?.username || account?.admin ? (
            <button
              onClick={() =>
                navigate(`/edit-account/${viewAccount?.id}`, {
                  state: { account: viewAccount, id: viewAccount?.id },
                })
              }
            >
              Edit Account
            </button>
          ) : null}
          {viewAccount?.username === account?.username || account?.admin ? (
            <button
              className="text-red-700"
              onClick={() => {
                if (
                  account?.username !== viewAccount?.username &&
                  !account?.admin
                ) {
                  alert('You Do Not Have Permission To Delete This Account');
                  return;
                }
                handleDelete(viewAccount!.id!);
                if (!account?.admin || !appState?.admin) {
                  window.location.reload();
                }
                navigate('/home');
              }}
            >
              Delete Account
            </button>
          ) : null}
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
}
