//import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Error() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="component-container">
      <div className="header">
        <h2>Error</h2>
      </div>
      <div className="component-view">
        <div id="error-container">
          <div id="error-header"></div>
          <div id="error-info">
            <h3>{data?.title}</h3>
          </div>
          <div id="error-message">
            <p>Error: {data?.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
