import uuid from 'uuid';
import database from '../firebase/firebase.js';


export const addExpenseActionGen =
(expense) => ({
    type: 'ADD_EXPENSE', expense
});

export const startAddExpenseActionGen =
(expenseData = {}) => (dispatch, getState) => {
    const {description = '', note = '', amount = 0, createdAt = 0} = expenseData;
    const expense = {description, note, amount, createdAt};
    return database
        .ref('expenses')
        .push(expense)
        .then(ref => dispatch(addExpenseActionGen({id: ref.key, ...expense})))
}




export const removeExpenseActionGen =
({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const editExpenseActionGen =
(id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});



export const setExpensesActionGen =
(expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpensesActionGen =
() => {
    return (dispatch, getState) => {
        return database
            .ref('expenses')
            .once('value')
            .then(snapshot => {
                const expensesArr = [];
                snapshot.forEach(s => {
                    expensesArr.push({
                        id: s.key, ...s.val()
                    })
                })
                dispatch(setExpensesActionGen(expensesArr))
            })
    }
}




