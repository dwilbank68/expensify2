import {firebase, GoogleAuthProvider, EmailAuthProvider} from '../firebase/firebase.js';
import {setUserActionGen, startSetUserActionGen} from "./userActionGenerators";
import database from "../firebase/firebase";



export const loginActionGen = (uid) => ({
    type: 'LOGIN', uid
});

export const logoutActionGen = () => ({
    type: 'LOGOUT'
});

// test('should return LOGOUT action obj', () => {
//     const action = logout();
//     expect(action).toEqual({
//         type: LOGOUT
//     })
// })

// test('should return LOGIN action obj', () => {
//     const action = login();
//     expect(action).toEqual({
//         type: LOGIN
//     })
// })

// pass in userDataObj, dispatch startSetUserActionGen with the userDataObj

export const startEmailSignup = (email, password, userData) => {
    console.log('------------------------------------------');
    console.log('startEmailSignup, userData ', userData);
    console.log('------------------------------------------');
    return (dispatch, getState) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
                console.log('data.user.uid', data.user.uid);
                return database
                    .ref(`users/${data.user.uid}/personalData`)
                    .update(userData)
                    .then(() => {
                        dispatch(setUserActionGen(userData));
                        console.log(`users/${data.user.uid}/personalData was updated`);
                    })
                    .catch((e) => console.log('error - ', e))
                // startSetUserActionGen({address:'made up stuff'})
            })
            .catch(e => {
                console.log('error in startEmailSignup... ',e);
            })
    }
}



export const startEmailLogin = (email, password) => {
    return (dispatch) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(x => {
                console.log('------------------------------------------');
                console.log('signed in with email and password ', x);
                console.log('------------------------------------------');
            })
            .catch(e => {
                console.log('email login error', e.code, e.message);
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        return firebase
            .auth()
            .signInWithPopup(GoogleAuthProvider)
            .then(result => {
                const user = result.user;
            })
    }
}

export const startLogout = () => {
    return (dispatch, getState) => {
        return firebase
            .auth()
            .signOut();
    }
}