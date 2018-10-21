import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import expensesReducer from "../reducers/expensesReducer";
import filtersReducer from "../reducers/filtersReducer";
import authReducer from "../reducers/authReducer.js";

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
}