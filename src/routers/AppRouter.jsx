import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { auth } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if (user?.uid) {

                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));

            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <Routes>

                <Route path='auth/*' element={<PublicRouter isAuthenticated={isLoggedIn} />}>
                    <Route path='*' element={<AuthRouter />} />
                </Route>

                <Route path='/' element={<PrivateRouter isAuthenticated={isLoggedIn} />}>
                    <Route path='/' element={<JournalScreen />} />
                </Route>


                <Route path="*" element={<Navigate to="auth/login" />} />

            </Routes>
        </Router>
    );
}
