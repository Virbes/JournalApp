import { auth, createUser, googleAuthProvider, popupGoogle, updateUser } from '../firebase/firebase-config';
import { types } from '../types/types';


// Asyncrono
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        createUser(auth, email, password).then(async ({ user }) => {
            await updateUser(user, { displayName: name });
            console.log(user);
        })
        .catch(e => {
            console.log(e);
        });

    }
}

// Asyncrono
export const startLoginEmailPassword = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login('123', 'palas'));
        }, 3500);
    }
}

// Asyncrono
export const startGoogleLogin = () => {
    return (dispatch) => {
        popupGoogle(auth, googleAuthProvider).then(({ user }) => {
            dispatch(login(user.uid, user.displayName));
        });
    }
}

// No Asyncrono
export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}