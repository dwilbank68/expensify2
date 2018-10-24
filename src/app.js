import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AppRouter, {history} from './routers/AppRouter.jsx';
import configureStore from './store/configureStore';
import 'react-dates/initialize';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import database, {firebase} from './firebase/firebase.js';

const store = configureStore();

let hasRendered = false;

import {startSetExpensesActionGen} from './actions/expensesActionGenerators.js';
import {loginActionGen, logoutActionGen} from './actions/authActionGenerators.js';
import {setUserActionGen} from './actions/userActionGenerators.js';
//
// store.dispatch(addExpenseActionGen({description: '20th', amount: 4500, createdAt: 1537492054974}));
// store.dispatch(addExpenseActionGen({description: '18th', amount: 66666, createdAt: 1537297200000}));
// store.dispatch(addExpenseActionGen({description: '15th', amount: 888888, createdAt: 1537038000000}));

import './firebase/firebase.js';

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase
    .auth()
    .onAuthStateChanged((user) => {
        if (user) {
            console.log('log in');
            store.dispatch(loginActionGen(user.uid))
            database
                .ref(`users/${user.uid}/personalData`)
                .once('value')
                .then(userSnapshot => {
                    const userData = userSnapshot.val() ? userSnapshot.val() : {};
                    console.log('data from editUserActionGen',userData);
                    store.dispatch(setUserActionGen(userData))
                    store.dispatch(startSetExpensesActionGen())
                        .then(() => {
                            renderApp();
                            if (['/', '/signup'].includes(history.location.pathname)) {
                                history.push('/dashboard');
                            }
                        })
                })


        } else {
            console.log('log out');
            store.dispatch(logoutActionGen());
            renderApp();
            history.push('/');
        }
    })