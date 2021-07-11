import React, { useState } from 'react'
import styled from 'styled-components';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import { useAppState } from '../contexts/AppContext';
import { storage } from '../firebase/firebase-config';

const UploadButton = styled.label`
    display: flex;
    position: fixed;
    right:20px;
    bottom: 20px;
    background-color: ${props => props.theme.color.darkAccent};
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    font-family: Ubuntu,sans-serif;
    font-size:${props => props.theme.size['x-base']};
    font-weight: ${props => props.theme.weight.bold};
`;

const Dashboard = () => {
    const rootRef = storage.ref().child('images');
    const [file, setFile] = useState(null);
    const [modalProps, setModalProps] = useState({});
    const { currentUser } = useAppState();

    const setModalProperties = (props) => {
        setModalProps(prevProps => {
            return {
                ...prevProps,
                ...props
            }
        });
    }

    const onFileSelect = (e) => {
        const file = e.target.files[0];
        if (file.type === '' || (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
            setModalProperties({
                isVisible: true,
                text: 'File format not supported.Please try again',
                buttonText: 'Cancel',
                onButtonClick: closeModal
            })
            e.target.value = '';
            return;
        }
        setFile(file);
        initiateUpload(e);
    }

    const initiateUpload = (e) => {
        const imageRef = rootRef.child(`${currentUser.uid}/${file.name}`);
        const uploadTask = imageRef.put(file);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            console.log('Uploading', progress);
            setModalProperties({
                isVisible: true,
                text: `Uploading ${progress}%`,
                buttonText: 'Stop',
                onButtonClick: () => stopUpload(uploadTask)
            });
        },
            (err) => {
                console.log('Upload error', err);
                e.target.value = '';
                switch (err.code) {
                    case 'storage/unauthorized':
                    case 'storage/unknown':
                        setModalProperties({
                            isVisible: true,
                            text: `Upload Failed`,
                            buttonText: 'Okay',
                            onButtonClick: closeModal
                        });
                        break;
                    case 'storage/canceled':
                        setModalProperties({
                            isVisible: true,
                            text: `Upload Cancelled`,
                            buttonText: 'Okay',
                            onButtonClick: closeModal
                        });
                        break;
                    default:
                }
            },
            () => {
                e.target.value = '';
                setModalProperties({
                    isVisible: true,
                    text: 'Upload Success',
                    buttonText: 'Okay',
                    onButtonClick: closeModal
                });
            });
    }

    const stopUpload = (task) => {
        if (task) {
            task.cancel();
            closeModal();
        }
    }

    const closeModal = () => {
        setModalProps(prevProps => {
            return {
                ...prevProps,
                isVisible: false
            }
        });
    }

    const { isVisible, text, buttonText, onButtonClick } = modalProps
    return (
        <>
            {isVisible ? <Modal text={text} buttonText={buttonText} onButtonClick={onButtonClick} /> : null}
            <Navbar />
            Hey {currentUser && currentUser.email} 👋
            <input type='file' id='upload-btn' accept={'.jpg,.png'} hidden onChange={onFileSelect} />
            <UploadButton htmlFor='upload-btn'><span className="material-icons">file_upload</span> Upload </UploadButton>
        </>
    )
}

export default Dashboard;


