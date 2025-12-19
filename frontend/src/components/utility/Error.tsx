//import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Error() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <div className="mx-auto my-auto h-full w-full text-2xl font-bold text-red-600">
        <h1>Error</h1>
      </div>
      <div className="mx-auto my-auto h-full w-full text-xl text-red-500">
        <div id="error-container" className="flex flex-col gap-y-32">
          <div id="error-header"></div>
          <div id="error-info">
            <h3>Error Title: {data?.title}</h3>
          </div>
          <div id="error-message">
            <p>Error Message: {data?.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
