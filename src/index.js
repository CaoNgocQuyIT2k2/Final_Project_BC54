import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { userReducer } from './redux/reducer/reducer';
import {applyMiddleware, combineReducers, compose, configureStore, createStore} from "@reduxjs/toolkit"
import { spinnerReducer } from './redux/reducer/spinner';
import thunk from 'redux-thunk'

const root = ReactDOM.createRoot(document.getElementById('root'));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let rootReducer = combineReducers({
  userReducer,
  spinnerReducer,
});
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

// let store = configureStore({
//   reducer:{
//     userReducer,
//   }
// })
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
