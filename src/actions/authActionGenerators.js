import {firebase, GoogleAuthProvider, EmailAuthProvider} from '../firebase/firebase.js';

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

export const startEmailSignup = (email, password) => {
    return (dispatch, getState) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
                let user = firebase.auth().currentUser;

                user.updateProfile({
                    address: "Whatever",
                    role: "regular joe"
                }).then(function(res) {
                    console.log('------------------------------------------');
                    console.log('user after updateProfile',user);
                    console.log('------------------------------------------');
                    // Update successful.
                }).catch(function(error) {
                    console.log('------------------------------------------');
                    console.log('error in updateProfile',error);
                    console.log('------------------------------------------');
                    // An error happened.
                });
                console.log('------------------------------------------');
                console.log('data ',JSON.stringify(data , null, 2));
                console.log('------------------------------------------');
            })
            .catch(e => {
                console.log('------------------------------------------');
                console.log('error from createUserAndRetrieveData... ',e);
                console.log('------------------------------------------');
            })
    }
}

// or

// export const startEmailSignup =
// ({whatever}) => (dispatch, getState) => {
//
// }

export const startEmailLogin = (email, password) => {
    return (dispatch) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(xxx => {
                console.log('------------------------------------------');
                console.log('signed in with email and password ', xxx);
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
    }
}

export const startLogout =
() => {
    return (dispatch, getState) => {
        return firebase
            .auth()
            .signOut();
    }
}