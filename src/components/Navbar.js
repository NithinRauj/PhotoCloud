import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase/firebase-config';
import Text from './Text';

const NavRoot = styled.div`
    width:100%;
    height:50px;
    background-color: ${props => props.theme.color.darkShades};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${Text}:first-child{
        margin-right: auto;
    }
    ${Text}{
        padding:0px 5px;
        margin:0px 25px;
    }
`;


const Navbar = () => {
    const history = useHistory();

    const signOut = async () => {
        try {
            await auth.signOut();
            history.push('/signin');
        } catch (err) {
            console.log('Sign Out failed');
        }
    }

    return (
        <NavRoot>
            <Text size={'medium'} color={'lightShade'}>PhotoCloud</Text>
            <Text size={'xs'} color={'lightShade'} cursor={'pointer'} onClick={() => history.push('/update-profile')}>My Profile</Text>
            <Text size={'xs'} color={'lightShade'} cursor={'pointer'} onClick={signOut}>Signout</Text>
        </NavRoot>
    )
}

export default Navbar
