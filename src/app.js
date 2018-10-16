import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AppRouter from './routers/AppRouter.jsx';
import configureStore from './store/configureStore';
import 'react-dates/initialize';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

import {addExpenseActionGen} from './actions/expensesActionGenerators';

store.dispatch(addExpenseActionGen({description: '20th', amount: 4500, createdAt: 1537492054974}));
store.dispatch(addExpenseActionGen({description: '18th', amount: 66666, createdAt: 1537297200000}));
store.dispatch(addExpenseActionGen({description: '15th', amount: 888888, createdAt: 1537038000000}));

import './firebase/firebase.js';

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));