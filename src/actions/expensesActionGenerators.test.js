import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../firebase/firebase.js';

import {
    addExpenseActionGen, editExpenseActionGen, removeExpenseActionGen,
    startAddExpenseActionGen
} from "./expensesActionGenerators";

import expenses from '../testing/fixtures/expenses.js';

const createMockStore = configureMockStore([thunk]);                        // 0

test('should return REMOVE_EXPENSE action obj', () => {
    const action = removeExpenseActionGen({id:'123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should return EDIT_EXPENSE action obj', () => {
    const action = editExpenseActionGen('123abc', {note:'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {note:'New note value'}
    })
})

test('should return ADD_EXPENSE action obj - provided values', () => {
    const action = addExpenseActionGen(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', (done) => {
    const mockStore = createMockStore();
    const expData = {description:'mouse', amount:3000, note:'good mouse', createdAt: 1000};
    mockStore
        .dispatch( startAddExpenseActionGen(expData) )
        .then(() => {
            const actions = mockStore.getActions();
            expect(actions[0]).toEqual({
                type:'ADD_EXPENSE',
                expense: { id: expect.any(String), ...expData }
            })
            return database
                .ref(`expenses/${actions[0].expense.id}`)
                .once('value');
        })
        .then(snapshot => {
            expect(snapshot.val()).toEqual(expData);
            done();
        });
});


test('should add expense with defaults to database and store', () => {
    const mockStore = createMockStore();
    const defaultExpense = {description:'', amount:0, note:'', createdAt: 0}

    mockStore
        .dispatch( startAddExpenseActionGen({}) )
        .then(() => {
            const actions = mockStore.getActions();
            expect(actions[0]).toEqual({
                type:'ADD_EXPENSE',
                expense: { id: expect.any(String), ...defaultExpense }
            })
            return database
                .ref(`expenses/${actions[0].expense.id}`)
                .once('value');
        })
        .then(snapshot => {
            expect(snapshot.val()).toEqual(defaultExpense);
            done();
        });
})



// test('should return ADD_EXPENSE action obj - default values', () => {
//     const action = addExpenseActionGen();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             note: '', description: '', amount: 0, createdAt: 0,
//             id: expect.any(String)
//         }
//     })
// })

// 0 -  pass in array of middleware to use
