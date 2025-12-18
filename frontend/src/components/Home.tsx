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
      <div className="header">
        <h2>Welcome Home</h2>
      </div>
      <div className="component-view">
        <div id="home-container">
          <div id="home-info"></div>
          <div id="active-tasks"></div>
        </div>
      </div>
    </div>
  );
}
