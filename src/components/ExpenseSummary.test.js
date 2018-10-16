import React from 'react';
import {shallow} from 'enzyme';

import {ExpenseSummary} from './ExpenseSummary.jsx';
import expenses from '../testing/fixtures/expenses.js';

import '../setupTests.js';

test('should render ExpenseSummary with expenses', () => {
    const wrapper = shallow(<ExpenseSummary expensesCount={2}
                                            expensesTotal={'$664.35'}/>);
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseSummary with no expenses', () => {
    const wrapper = shallow(<ExpenseSummary expensesCount={0}
                                            expensesTotal={'$0.00'}/>);
    expect(wrapper).toMatchSnapshot();
})