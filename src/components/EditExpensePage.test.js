import React from 'react';

import {shallow} from 'enzyme';
import {EditExpensePage} from './EditExpensePage.jsx';
import expenses from '../testing/fixtures/expenses.js';

import '../setupTests.js';

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<EditExpensePage editExpense={editExpense}
                                       expense={expenses[2]}
                                       removeExpense={removeExpense}
                                       history={history}/>);
})

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should handle editExpense', () => {
    wrapper
        .find('ExpenseForm')
        .prop('onSubmit')({note: 'change'})
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, {note: 'change'})
})

test('should handle removeExpense', () => {
    wrapper
        .find('button')
        // .prop('onClick')()
        .simulate('click')
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[2].id})
    // expect(removeExpense).toHaveBeenLastCalledWith('3')
})