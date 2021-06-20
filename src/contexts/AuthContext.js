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

    const data = {
        currentUser,
        onSignup,
        onSignin
    }

    return (
        <AuthContext.Provider value={data}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
