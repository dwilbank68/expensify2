import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../firebase/firebase.js';

import {
    addExpenseActionGen, editExpenseActionGen, removeExpenseActionGen, setExpensesActionGen,
    startAddExpenseActionGen, startEditExpenseActionGen, startRemoveExpenseActionGen, startSetExpensesActionGen
} from "./expensesActionGenerators";

import expenses from '../testing/fixtures/expenses.js';

const uid = 'testuid';
const defaultAuthState = {auth: {uid}};
const createMockStore = configureMockStore([thunk]);                        // 0

beforeEach( done => {
    jest.setTimeout(10000);
    const expensesData = {}
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt}
    });
    database
        .ref(`users/${uid}/expenses`)
        .set(expensesData)
        .then(() => done());
});

test('should return REMOVE_EXPENSE action obj', () => {
    const action = removeExpenseActionGen({id:'123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should remove expense from firebase', (done) => {
    // provide auth.uid so test will think user is logged in
    const mockStore = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    mockStore
        .dispatch( startRemoveExpenseActionGen({id}) )
        .then(() => {
            const actions = mockStore.getActions();
            expect(actions[0]).toEqual({
                type:'REMOVE_EXPENSE',
                id
            })
            return database
                .ref(`users/${uid}/expenses/${id}`)
                .once('value');
        })
        .then(snapshot => {
            expect(snapshot.val()).toBeFalsy();
            done();
        });
});



test('should return EDIT_EXPENSE action obj', () => {
    const action = editExpenseActionGen('123abc', {note:'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {note:'New note value'}
    })
})

test('should edit expenses from firebase', (done) => {
    const mockStore = createMockStore({auth: {uid}});
    const id = expenses[2].id;
    const updates = { amount: 2};
    mockStore
        .dispatch( startEditExpenseActionGen(id, updates) )
        .then(() => {
            const actions = mockStore.getActions();
            expect(actions[0]).toEqual({
                type:'EDIT_EXPENSE',
                id,
                updates
            })
            return database
                .ref(`users/${uid}/expenses/${id}`)
                .once('value');
        })
        .then(snapshot => {
            expect(snapshot.val().amount).toEqual(updates.amount);
            done();
        });
})




test('should return ADD_EXPENSE action obj - provided values', () => {
    const action = addExpenseActionGen(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', (done) => {
    const mockStore = createMockStore(defaultAuthState);
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
                .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value');
        })
        .then(snapshot => {
            expect(snapshot.val()).toEqual(expData);
            done();
        });
});

test('should add expense with defaults to database and store', (done) => {
    const mockStore = createMockStore(defaultAuthState);
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
                .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
                .once('value');
        })
        .then(snapshot => {
            expect(snapshot.val()).toEqual(defaultExpense);
            done();
        });
})



test('should return SET_EXPENSES action obj', () => {
    const action = setExpensesActionGen(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store
        .dispatch(startSetExpensesActionGen())
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
            });
            done();
        });
});
