import React from 'react'
import Navbar from '../components/Navbar';
import { useAppState } from '../contexts/AppContext';

const Dashboard = ({ history }) => {
    const { currentUser } = useAppState();

    return (
        <>
            <Navbar />
            Welcome {currentUser && currentUser.email}
        </>
    )
}

export default Dashboard;
