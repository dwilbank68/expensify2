import React from 'react';

import {shallow} from 'enzyme';
import {ExpenseListFilters} from './ExpenseListFilters.jsx';
import {filters, altFilters} from '../testing/fixtures/filters.js';

import '../setupTests.js';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();
    setEndDate = jest.fn();
    setStartDate = jest.fn();
    wrapper = shallow(<ExpenseListFilters   filters={filters}
                                            setTextFilter={setTextFilter}
                                            sortByDate={sortByDate}
                                            sortByAmount={sortByAmount}
                                            setStartDate={setStartDate}
                                            setEndDate={setEndDate}/>);
})

test('should render ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters with alt data', () => {
    wrapper.setProps({filters: altFilters})
    expect(wrapper).toMatchSnapshot();
})

test('should handle text change', () => {
    const value = 'bliggy';
    wrapper
        .find('input').at(0)
        // .simulate('change', {
        //     persist: () => {
        //     }, target: {value}
        // })
        .simulate('change', {target: {value}});
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
})

test('should sort by date', () => {

})

test('should sort by amount', () => {

})

test('should handle date changes', () => {

})

test('should handle date focus changes', () => {

})
