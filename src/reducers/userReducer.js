const defaultState = {};

export default
(state=defaultState, action) => {
    switch (action.type) {
        case ('SET_USER_DATA'): return action.data;
        default: return state;
    }
}