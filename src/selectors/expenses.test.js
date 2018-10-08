import moment from 'moment';
import selectExpenses from './expenses';

import expenses from '../testing/fixtures/expenses.js';

test('should filter by text value', () => {
    const filters = {
        text: 'e', sortBy: 'date', startDate: undefined, endDate: undefined
    }
    const expected = [expenses[2], expenses[1]];
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual(expected);
})

test('should filter by startDate', () => {
    const filters = {
        text: '', sortBy: 'date',
        startDate: moment(0), endDate: undefined
    }
    const expected = [expenses[2], expenses[0]];
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual(expected);
})

test('should filter by endDate', () => {
    const filters = {
        text: '', sortBy: 'date',
        startDate: moment(0).subtract(5, 'days'), endDate: moment(0)
    }
    const expected = [expenses[0], expenses[1]];
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual(expected);
})

test('should sort by date', () => {
    const filters = {
        text: '', sortBy: 'date',
        startDate: undefined, endDate: undefined
    }
    const expected = [expenses[2], expenses[0], expenses[1]];
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual(expected);
})


test('should sort by amount', () => {
    const filters = {
        text: '', sortBy: 'amount',
        startDate: undefined, endDate: undefined
    }
    const expected = [expenses[1], expenses[2], expenses[0]];
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual(expected);
})