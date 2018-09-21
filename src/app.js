import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AppRouter from './routers/AppRouter.jsx';
import configureStore from './store/configureStore';

import {addExpenseActionGen} from "./actions/expensesActionGenerators";
import {setTextFilter} from "./actions/filtersActionGenerators";
import getVisibleExpenses from './selectors/expenses.js';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpenseActionGen({description: '20th', amount:4500, createdAt: 1537492054974}));
store.dispatch(addExpenseActionGen({description: '18th', amount:66666, createdAt: 1537297200000}));
store.dispatch(addExpenseActionGen({description: '15th', amount: 888888, createdAt: 1537038000000}));


const state = store.getState();
const visExpenses = getVisibleExpenses(state.expenses, state.filters);

console.log(store.getState());

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));