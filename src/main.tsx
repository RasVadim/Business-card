// import { StrictMode } from 'react';

import { Provider } from 'jotai';
import { AliveScope } from 'react-activation';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import i18n from './i18n';

import './styles/common.styl';
import './index.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Provider>
      <I18nextProvider i18n={i18n}>
        <AliveScope>
          <App />
        </AliveScope>
      </I18nextProvider>
    </Provider>
  </BrowserRouter>,
  // </StrictMode>,
);
