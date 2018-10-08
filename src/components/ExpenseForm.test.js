import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';

import ExpenseForm from './ExpenseForm.jsx';
import expenses from '../testing/fixtures/expenses.js';

import '../setupTests.js';

test('should render ExpenseForm', () => {
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
})

test('should render error for invalid form data', () => {
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
    wrapper
        .find('form')
        .simulate('submit', {
            preventDefault: () => {
            }
        })         // 1
    // expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper.state().error.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
})

// 1 -  or 'click', 'change'
//      note that you pass an object (a mock 'event') as the 2nd arg,
//      otherwise the component's 'onSubmit' func will try to
//      call 'preventDefault' on nothing

test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm/>);
    const value = 'New Descriptioin'
    wrapper
        .find('input').at(0)
        .simulate('change', {target: {value}})
    expect(wrapper.state('description')).toBe(value);
})

test('should set note on textarea change', () => {
    const wrapper = shallow(<ExpenseForm/>);
    const value = 'New text woohoo'
    wrapper
        .find('textarea')
        .simulate('change', {
            persist: () => {
            }, target: {value}
        })
    expect(wrapper.state('note')).toBe(value);
})

test('should set amount if input valid', () => {
    const wrapper = shallow(<ExpenseForm/>);
    const value = '23.50';
    wrapper
        .find('input').at(1)
        .simulate('change', {
            persist: () => {
            }, target: {value}
        })
    expect(wrapper.state('amount')).toBe(value);
})

test('should not set amount if input invalid', () => {
    const wrapper = shallow(<ExpenseForm/>);
    const value = '12.122';
    wrapper
        .find('input').at(1)
        .simulate('change', {
            persist: () => {
            }, target: {value}
        })
    expect(wrapper.state('amount')).not.toBe(value);
})

test('should call onSubmit prop for valid form submit', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}
                                         onSubmit={onSubmitSpy}/>);
    wrapper
        .find('form')
        .simulate('submit', {
            preventDefault: () => {}
        });
    expect(wrapper.state('error')).toBe('');
    const {amount, description, note, createdAt} = expenses[0];
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        amount, description, note, createdAt
    })

})

test('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm/>);
    const now = moment();
    wrapper
        .find('withStyles(SingleDatePicker)')                   // 1
        .prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
})

test('should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm/>);
    wrapper
        .find('withStyles(SingleDatePicker)')                   // 1
        .prop('onFocusChange')({focused:true});
    expect(wrapper.state('calendarFocused')).toEqual(true);
})

// 1 -  see the .snap file - SingleDatePicker is wrapped this way