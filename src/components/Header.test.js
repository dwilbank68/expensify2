import React from 'react';

import {shallow} from 'enzyme';
import Header from './Header.jsx';

import '../setupTests.js';

test('should render Header', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper).toMatchSnapshot();
})