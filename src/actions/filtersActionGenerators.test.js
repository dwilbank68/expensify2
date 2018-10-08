import moment from 'moment';

import {
    setTextFilter, sortByAmount, sortByDate,
    setStartDate, setEndDate
} from "./filtersActionGenerators";

test('should return SET_START_DATE action obj', () => {
    const arg = moment(0)
    const action = setStartDate(arg);
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('should return SET_END_DATE action obj', () => {
    const arg = moment(1000);
    const action = setEndDate(arg);
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(1000)
    })
})

test('should return SORT_BY_AMOUNT action obj', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})

test('should return SORT_BY_DATE action obj', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('should return SET_TEXT_FILTER action obj with default text', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text:''
    })
})

test('should return SET_TEXT_FILTER action obj', () => {
    const arg = 'billy';
    const action = setTextFilter(arg);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'billy'
    })
})

// .toBe will fail
// .toEqual, will work - compares properties of objects



// .toBe will fail
// .toEqual, will work - compares properties of objects



// .toBe will fail
// .toEqual, will work - compares properties of objects



