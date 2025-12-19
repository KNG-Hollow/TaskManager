//import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseAppState } from '../../context/Context';
import { useEffect } from 'react';

export default function Error() {
  const location = useLocation();
  const data = location.state;
  const { appState } = UseAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!appState?.active) {
      navigate('/login');
    }
  }, [navigate, appState]);

  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <div
        id="container-header"
        className="flex h-1/5 w-full items-center justify-center text-2xl font-bold text-red-600"
      >
        <h1>Error</h1>
      </div>
      <div className="mx-auto flex h-4/5 w-full justify-center text-xl text-red-500">
        <div id="error-container" className="flex w-full flex-col">
          <div id="error-header"></div>
          <div id="error-info" className="mt-5">
            <h3>Error Title: </h3>
            <h3>{data?.title}</h3>
          </div>
          <div id="error-message" className="mt-20">
            <h4>Error Message: </h4>
            <p>{data?.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
