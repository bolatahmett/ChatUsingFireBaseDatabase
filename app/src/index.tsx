import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FirebaseContext from './components/FirebaseContext';
import firebase, { database } from './components/firebase';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/reducers/index';
import App from './app';
import ErrorBoundary from './components/ErrorBoundary';

const store = createStore(rootReducer);

ReactDOM.render(
    <FirebaseContext.Provider value={firebase}>
        <Provider store={store}>

            <App firebase={firebase} database={database} />
        </Provider>
    </FirebaseContext.Provider>
    , document.getElementById('app'))