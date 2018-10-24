import database from "../firebase/firebase";
import  {history} from '../routers/AppRouter.jsx';


export const setUserActionGen = (dataObj) => ({
    type: 'SET_USER_DATA',
    data: dataObj
});

// export const startGetPersonalDataActionGen = (uid) => {
//     return (dispatch, getState) => {
        // return database
        //     .ref(`users/${uid}/personalData`)
        //     .once('value')
//             .then(snapshot => {
//                 if (!snapshot.val()) {
//                     console.log('there is no snapshot.val, and no user Data, so we will push');
//                     history.push(`/user_edit/${uid}`);
//                 }
//                 dispatch(getPersonalDataActionGen(snapshot.val()))
//                 console.log('------------------------------------------');
//                 console.log('snapshot.val() from getPersonalDataActionGen',snapshot.val());
//                 console.log('------------------------------------------');
//             })
//             .catch(e => {
//                 console.log('error is ', e);
//             })
//     }
// }