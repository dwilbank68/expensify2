import {
    addExpenseActionGen, editExpenseActionGen,
    removeExpenseActionGen
} from "./expensesActionGenerators";


test('should return REMOVE_EXPENSE action obj', () => {
    const action = removeExpenseActionGen({id:'123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should return EDIT_EXPENSE action obj', () => {
    const action = editExpenseActionGen('123abc', {note:'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {note:'New note value'}
    })
})

test('should return ADD_EXPENSE action obj - provided values', () => {
    const expenseData = {
        description: 'Rent', amount:195000, createdAt:1000,
        note: 'Renty'
    }
    const action = addExpenseActionGen(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData, id: expect.any(String)
        }
    })
})


test('should return ADD_EXPENSE action obj - default values', () => {
    const action = addExpenseActionGen();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            note: '', description: '', amount: 0, createdAt: 0,
            id: expect.any(String)
        }
    })
})

