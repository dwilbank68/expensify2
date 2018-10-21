import authReducer from './authReducer.js';

test('should set uid on LOGIN', () => {
    const action = {type: 'LOGIN', uid: 'abc123'}
    const state = authReducer({}, action)
    expect(state).toEqual({uid: 'abc123'});
})

test('should wipe uid on LOGOUT', () => {
    const action = {type: 'LOGOUT'}
    const state = authReducer({uid: 'foo'}, action)
    expect(state).toEqual({});
})