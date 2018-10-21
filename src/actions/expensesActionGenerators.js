import database from '../firebase/firebase.js';

export const addExpenseActionGen = (expense) => {
    return {
        type: 'ADD_EXPENSE', expense
    }
};

export const startAddExpenseActionGen = (expenseData = {}) => (dispatch, getState) => {
    const {description = '', note = '', amount = 0, createdAt = 0} = expenseData;
    const expense = {description, note, amount, createdAt};
    const uid = getState().auth.uid;
    return database
        .ref(`users/${uid}/expenses`)
        .push(expense)
        .then(ref => dispatch(addExpenseActionGen({id: ref.key, ...expense})))
}




export const removeExpenseActionGen = ({id} = {}) => {
    return {
        type: 'REMOVE_EXPENSE',
        id
    }
};

export const startRemoveExpenseActionGen = ({id}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses/${id}`)
            .remove()
            .then(() => dispatch(removeExpenseActionGen({id})))
    }
}




export const editExpenseActionGen = (id, updates) => {
    return {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
};

export const startEditExpenseActionGen = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses/${id}`)
            .update(updates)
            .then(() => dispatch(editExpenseActionGen(id, updates)))
    }
}




export const setExpensesActionGen = (expenses) => {
    return {
        type: 'SET_EXPENSES',
        expenses
    }
};

export const startSetExpensesActionGen = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses`)
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




