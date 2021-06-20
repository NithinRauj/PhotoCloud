import React from 'react'
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { currentUser } = useAuth();
    return (
        <div>
            Welcome {currentUser && currentUser.email}
        </div>
    )
}

export default Dashboard;
