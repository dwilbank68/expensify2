import React from 'react';
import {shallow} from 'enzyme';

import {ExpenseListItem} from './ExpenseListItem.jsx';
import expenses from '../testing/fixtures/expenses.js';

import '../setupTests.js';

test('should render ExpenseListItem with expense', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
})