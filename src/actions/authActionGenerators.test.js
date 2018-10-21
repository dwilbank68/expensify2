import { loginActionGen, logoutActionGen } from "./authActionGenerators";

test('should return LOGIN action obj', () => {
    const action = loginActionGen('123abc');
    expect(action).toEqual({
        type: 'LOGIN',
        uid: '123abc'
    })
})

test('should return LOGOUT action obj', () => {
    const action = logoutActionGen();
    expect(action).toEqual({
        type: 'LOGOUT'
    })
})

