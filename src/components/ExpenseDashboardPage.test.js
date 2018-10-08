import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDashboardPage from './ExpenseDashboardPage';

import '../setupTests.js';

test('should render ExpenseDashboardPage correctly', () => {
    const wrapper = shallow(<ExpenseDashboardPage />);
    expect(wrapper).toMatchSnapshot();
});