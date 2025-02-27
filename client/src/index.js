import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Provider } from 'react-redux';
import {PersistGate} from "redux-persist";
import {persistStore} from "redux-persist";
import store from "./redux/store.js";

import App from './App';
import './app.css';
import 'react-toastify/dist/ReactToastify.css';


let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
          <ToastContainer
            position='bottom-center'
            autoClose={2000}
            hideProgressBar={true}
            closeButton={false}
            theme="colored"
            icon={false}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

