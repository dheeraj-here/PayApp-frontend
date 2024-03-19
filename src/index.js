import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import App from './App';
import GlobalStyles from './GlobalsStyles';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyles />
      <div className="bg-[#f1f1f1] h-max font-roboto">
        <App />
      </div>
    </RecoilRoot>
  </React.StrictMode>
);

