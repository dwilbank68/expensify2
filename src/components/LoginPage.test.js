import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from './LoginPage.jsx';

let wrapper, startGoogleLogin;

beforeEach(() => {
    startGoogleLogin = jest.fn();
    wrapper = shallow(
        <LoginPage startGoogleLogin={startGoogleLogin}/>
    );
})

test('should render LoginPage', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should call startGoogleLogin on button click', () => {
    wrapper
        .find('button').at(0)
        .simulate('click')
    expect(startGoogleLogin).toHaveBeenCalled();
})