import React, { useContext, useEffect, useReducer, useState } from 'react';
import actionTypes from '../constants/action-types';
import { auth } from '../firebase/firebase-config';
import reducer, { initialState } from './reducer';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export const useAppState = () => {
    return useContext(StateContext);
}

export const useDispatch = () => {
    return useContext(DispatchContext);
}

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeListener = auth.onAuthStateChanged(user => {
            dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
            setLoading(false);
        })

        return unsubscribeListener;
    }, []);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {!loading && children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
