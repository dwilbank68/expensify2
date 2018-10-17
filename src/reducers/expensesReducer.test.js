import moment from 'moment';
import expenses from '../testing/fixtures/expenses.js';
import expensesReducer from './expensesReducer.js';

test('should set up default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {type: 'REMOVE_EXPENSE', id: expenses[1].id};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
})

test('should not remove expense if id not found', () => {
    const action = {type: 'REMOVE_EXPENSE', id: '5'};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test('should add an expense', () => {
    const expense = {
        id: '100', description: 'Bloop', note: '',
        amount: 195, createdAt: 0
    };
    const action = {type: 'ADD_EXPENSE', expense};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
})

test('should edit an expense', () => {
    const updates = {note: 'Jiminy Jones'};
    const action = {type: 'EDIT_EXPENSE', id:  '1', updates};
    const state = expensesReducer(expenses, action);
    expect(state[0].note).toBe('Jiminy Jones');
})

test('should not edit an expense if not found', () => {
    const updates = {note: 'no update'};
    const action = {type: 'EDIT_EXPENSE', id: '666', updates};
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})


test('should set expenses', () => {
    const action = {type: 'SET_EXPENSES', expenses: [expenses[1]]}
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[1]]);
})