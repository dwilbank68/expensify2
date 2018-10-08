import filtersReducer from './filtersReducer.js';
import moment from 'moment';

test('should set up default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '', sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
})

test('should set sortBy to date', () => {
    const currentState = {
        text: '', sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const action = {type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const currentState = {
        text: '', sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
    const action = {type: 'SET_TEXT_FILTER', text: 'PooP'};
    const state = filtersReducer(currentState, action);
    expect(state.text).toBe('PooP');
})

test('should set startDate filter', () => {
    const action = {type: 'SET_START_DATE', startDate: moment(654654654)};
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(moment(654654654));
})


test('should set endDate filter', () => {
    const action = {type: 'SET_END_DATE', endDate: moment(654654654)};
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(moment(654654654));
})