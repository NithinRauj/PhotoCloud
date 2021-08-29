import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { auth, db } from '../firebase/firebase-config';
import Text from './Text';
import AlbumOption, { AlbumList, AlbumsContainer } from './AlbumOption';
import { useAppState } from '../contexts/AppContext';
import { Backdrop } from './Backdrop';

const NavRoot = styled.div`
    width: 100%;
    height: 50px;
    background-color: ${props => props.theme.color.darkShade};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${Text}:first-child{
        margin-right: auto;
    }
    & > ${Text}{
        padding: 0px 5px;
        margin: 0px 25px;
    }
`;


const Navbar = ({ openModal, onAlbumClick }) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [albums, setAlbums] = useState([]);
    const { currentUser, photosPath } = useAppState();

    useEffect(() => {
        getAlbums();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photosPath])

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

    const getAlbums = () => {
        const albumsRef = db.collection('users').doc(currentUser.uid).collection('albums');
        albumsRef.get().then(querySnapshot => {
            const arr = [];
            querySnapshot.forEach(doc => {
                arr.push(doc.data());
            })
            setAlbums(arr);
            console.log(arr)
        })
            .catch(err => {
                console.log('Albums fetch error', err);
            })
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
                    {albums.map((album, index) => <AlbumOption key={index} name={album.name} onSelect={() => onAlbumClick(album.name)} />)}
                    <AlbumOption name={'Create Album'} isCreateOption={true} onCreate={openModal} />
                </AlbumList>
            </AlbumsContainer>
            {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}
            <Text size={'xs'} color={'lightShade'} cursor={'pointer'} onClick={() => history.push('/update-profile')}>My Profile</Text>
            <Text size={'xs'} color={'lightShade'} cursor={'pointer'} onClick={signOut}>Signout</Text>
        </NavRoot>
    )
}

Navbar.propTypes = {
    onCreate: PropTypes.func
};

export default Navbar;
