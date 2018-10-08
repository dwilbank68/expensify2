import React from 'react';
import {shallow} from 'enzyme';

import NotFoundPage from './NotFoundPage.jsx';

import '../setupTests.js';

test('should render NotFoundPage with expense', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
})