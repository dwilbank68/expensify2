import uuid from 'uuid';

export const
addExpenseActionGen = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description, note, amount, createdAt
    }
});

export const removeExpenseActionGen = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const editExpenseActionGen = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// export const editExpenseActionGen = (id, updates) => {
//     console.log('------------------------------------------');
//     console.log('updates ',updates);
//     console.log('------------------------------------------');
//     return {
//         type: 'EDIT_EXPENSE',
//         id,
//         updates
//     }
// };