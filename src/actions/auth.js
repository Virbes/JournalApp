import Swal from 'sweetalert2';
import { auth, createUser, googleAuthProvider, popupGoogle, signIn, updateUser } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';


// Asyncrono
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        createUser(auth, email, password).then(async ({ user }) => {
            await updateUser(user, { displayName: name });
            dispatch(login(user.uid, user.displayName));
        }).catch(error => {

            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error
            });

        });

    }
}

// Asyncrono
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading());

        signIn(auth, email, password).then(({ user }) => {

            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());

        }).catch(error => {
            console.log(error);
            dispatch(finishLoading());

            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error
            });

        });

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


export const startLogout = () => {
    return async (dispatch) => {
        await auth.signOut();

        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
});