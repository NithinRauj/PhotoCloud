import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { auth } from '../firebase/firebase-config';
import Text from './Text';
import AlbumOption, { AlbumList, AlbumsContainer } from './AlbumOption';
import { useDispatch } from '../contexts/AppContext';
import actionTypes from '../constants/action-types';

const NavRoot = styled.div`
    width:100%;
    height:50px;
    background-color: ${props => props.theme.color.darkShade};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${Text}:first-child{
        margin-right: auto;
    }
    & > ${Text}{
        padding:0px 5px;
        margin:0px 25px;
    }
`;


const Navbar = () => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const signOut = async () => {
        try {
            await auth.signOut();
            history.push('/signin');
        } catch (err) {
            console.log('Sign Out failed');
        }
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const initializeAlbum = () => {
        setModalProperties({ isVisible: false });
    }

    const setModalProperties = (props) => {
        dispatch({ type: actionTypes.SET_MODAL_PROPS, payload: props })
    }

    const createAlbum = () => {
        setModalProperties({
            isVisible: true,
            showTitleField: true,
            text: `Create Album`,
            buttonText: 'Create',
            onButtonClick: initializeAlbum
        });
    }

    return (
        <NavRoot>
            <Text size={'medium'} color={'lightShade'}>PhotoCloud</Text>
            <AlbumsContainer onClick={toggleDropdown}>
                <Text size={'xs'} color={'lightShade'} cursor={'pointer'} >Albums</Text>
                <span className="material-icons" style={{ cursor: 'pointer', color: 'white', fontSize: '20px', verticalAlign: 'bottom' }}>
                    arrow_drop_down
                </span>
                <AlbumList style={{ display: isOpen ? 'flex' : 'none' }}>
                    <AlbumOption name={'Album 1'} />
                    <AlbumOption name={'Album 2'} />
                    <AlbumOption name={'Album 3'} />
                    <AlbumOption name={'Create Album'} isCreateOption={true} onCreate={createAlbum} />
                </AlbumList>
            </AlbumsContainer>
            <Text size={'xs'} color={'lightShade'} cursor={'pointer'} onClick={() => history.push('/update-profile')}>My Profile</Text>
            <Text size={'xs'} color={'lightShade'} cursor={'pointer'} onClick={signOut}>Signout</Text>
        </NavRoot>
    )
}

Navbar.propTypes = {
    onCreate: PropTypes.func
};

export default Navbar;
