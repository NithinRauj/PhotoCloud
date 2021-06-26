import React, { useState } from 'react'
import Button from '../components/Button';
import Text from '../components/Text';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = ({ history }) => {
    const { currentUser, onSignout } = useAuth();
    const [error, setError] = useState('');

    const signOut = async () => {
        try {
            await onSignout();
            history.push('/signin');
        } catch (err) {
            setError('Sign Out failed');
        }
        setError('');
    }

    return (
        <div>
            Welcome {currentUser && currentUser.email}<br />
            {error && <Text color='error'>{error}</Text>}
            <Button width={'130px'} height={'large'} text={'Sign Out'}
                bgColor={'main'} textColor={'lightShade'} onClick={signOut} />
            <Button width={'170px'} height={'large'} text={'Update Profile'}
                bgColor={'main'} textColor={'lightShade'} onClick={() => history.push('/update-profile')} />
        </div>
    )
}

export default Dashboard;
