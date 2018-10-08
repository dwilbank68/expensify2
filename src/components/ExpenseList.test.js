import React from 'react';
import {shallow} from 'enzyme';

import {ExpenseList} from './ExpenseList.jsx';
import expenses from '../testing/fixtures/expenses.js';

import '../setupTests.js';

test('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseList with empty message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
})
