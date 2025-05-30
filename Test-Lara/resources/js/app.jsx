import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import Main from './Main';
import '../css/app.css';

createRoot(document.getElementById('app')).render(
  <Provider store={store}>
    <Main />
  </Provider>
);
