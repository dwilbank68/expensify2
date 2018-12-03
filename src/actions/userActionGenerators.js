import database from "../firebase/firebase";
import  {history} from '../routers/AppRouter.jsx';
import {editExpenseActionGen} from "./expensesActionGenerators";


export const setUserActionGen = (dataObj) => ({
    type: 'SET_USER_DATA',
    data: dataObj
});



export const startSetUserActionGen = (userData) => {
    console.log('------------------------------------------');
    console.log('startSetUserActionGen is running ',userData);
    console.log('------------------------------------------');
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/personalData`)
            .update(userData)
            .then(() => dispatch(setUserActionGen(userData)))
            .catch((e) => console.log('error - ', e))
    }
}