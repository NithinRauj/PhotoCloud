import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase-config';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeListener = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribeListener;
    }, []);

    const onSignup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const onSignin = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const onSignout = () => {
        return auth.signOut();
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    }

    const updateEmail = (email) => {
        return currentUser.updateEmail(email);
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password);
    }

    const data = {
        currentUser,
        onSignup,
        onSignin,
        onSignout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={data}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
