import React from 'react';

import {shallow} from 'enzyme';
import {EditExpensePage} from './EditExpensePage.jsx';
import expenses from '../testing/fixtures/expenses.js';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage startEditExpense={startEditExpense}
                                       expense={expenses[2]}
                                       startRemoveExpense={startRemoveExpense}
                                       history={history}/>);
})

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle startEditExpense', () => {
    wrapper
        .find('ExpenseForm')
        .prop('onSubmit')({note: 'change'})
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, {note: 'change'})
})

test('should handle startRemoveExpense', () => {
    wrapper
        .find('button')
        // .prop('onClick')()
        .simulate('click')
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[2].id})
    // expect(removeExpense).toHaveBeenLastCalledWith('3')
})