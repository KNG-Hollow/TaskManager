import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Task } from './utility/Interfaces';
import { UseAccount, UseAppState } from '../context/Context';

export default function Home() {
  const { account } = UseAccount();
  const { appState } = UseAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appState?.active) {
      navigate('/login');
    }
  }, [navigate, appState]);

  return (
    <div className="flex h-full w-full flex-1 flex-col self-center px-4">
      <div className="flex h-1/5 w-full items-center justify-center border-4 bg-fuchsia-600 text-2xl font-bold">
        <h2>Welcome Home {account?.name}</h2>
      </div>
      <div className="mx-auto flex h-4/5 w-full flex-col">
        <div id="home-container">
          <div id="home-info">
            <Information />
          </div>
          <div id="activeTasks-container">
            <ActiveTasks />
          </div>
        </div>
      </div>
    </div>
  );
}

function Information() {
  const { appState } = UseAppState();
  const navigate = useNavigate();
  const adminVisible = appState?.admin === true ? true : false;
  const adminButtons = () => {
    if (!adminVisible) {
      return null;
    } else {
      return (
        <div id="button-container-admin">
          <button
            onClick={() => {
              navigate('/create-account');
            }}
          >
            Create Account
          </button>
          <button
            onClick={() => {
              navigate('/accounts');
            }}
          >
            Accounts
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Info</h2>
      <div id="button-container">
        <button
          onClick={() => {
            navigate('/create-task');
          }}
        >
          Create Task
        </button>
        <button
          onClick={() => {
            navigate('/tasks');
          }}
        >
          Tasks
        </button>
      </div>
      {adminButtons()}
    </div>
  );
}

function ActiveTasks() {
  return (
    <div>
      <h2>Beans</h2>
    </div>
  );
}
