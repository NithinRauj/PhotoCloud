import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppState } from '../contexts/AppContext';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAppState();
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to='/signin' />
            }}
        />
    )
}

export default PrivateRoute;
