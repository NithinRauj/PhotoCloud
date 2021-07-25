import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Lightbox from '../components/Lightbox';
import { Loader } from '../components/Loader';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Photo, { PhotosGrid } from '../components/Photo';
import { UploadButton } from '../components/UploadButton';
import { useAppState } from '../contexts/AppContext';
import { storage } from '../firebase/firebase-config';

const Header = styled.div`
    font-family: 'Ubuntu';
    font-size: ${props => props.theme.size['x-base']};
    margin: 20px 20px 0px;
`;

const Dashboard = () => {
    const rootRef = storage.ref().child('images');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [previewImageIndex, setPreviewIndex] = useState(null);
    const [isPreviewMode, togglePreviewMode] = useState(false);
    const [modalProps, setModalProps] = useState({});
    const { currentUser } = useAppState();

    useEffect(() => {
        fetchPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchPhotos = () => {
        setLoading(true);
        const dirRef = storage.ref().child(`images/${currentUser.uid}`);
        dirRef.listAll()
            .then(res => {
                setImages([]);
                setImageItems(res);
            })
            .catch(err => {
                console.log('List images error', err);
            });
    }

    const setModalProperties = (props) => {
        setModalProps(prevProps => {
            return {
                ...prevProps,
                ...props
            }
        });
    }

    const setImageItems = (res) => {
        const totalItems = res.items.length
        let count = 0;
        res.items.forEach((img) => {
            img.getDownloadURL()
                .then((url) => {
                    setImages(prevProps => {
                        return [...prevProps, {
                            name: img.name,
                            url
                        }]
                    })
                    count++;
                    if (count === totalItems) {
                        setLoading(false);
                    }
                })
                .catch(err => {
                    console.log('URL fetch error', err);
                });
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
        initiateUpload(e, file);
    }

    const initiateUpload = (e, file) => {
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
                fetchPhotos();
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

    const openPreview = (index) => {
        setPreviewIndex(index);
        togglePreviewMode(true);
    }

    const closePreview = () => {
        togglePreviewMode(false);
    }

    const showNextImage = () => {
        const nextIndex = previewImageIndex + 1;
        setPreviewIndex(nextIndex >= images.length ? 0 : nextIndex);
    }

    const showPrevImage = () => {
        const prevIndex = previewImageIndex - 1;
        setPreviewIndex(prevIndex < 0 ? images.length - 1 : prevIndex);

    }

    const { isVisible, text, buttonText, onButtonClick } = modalProps;
    const userName = currentUser.email.split('@')[0];
    return (
        <>
            {isVisible ? <Modal text={text} buttonText={buttonText} onButtonClick={onButtonClick} /> : null}
            {isPreviewMode &&
                <Lightbox
                    currentImage={images[previewImageIndex]}
                    onClose={closePreview}
                    onNextAction={showNextImage}
                    onPrevAction={showPrevImage}
                />
            }
            <Navbar />
            {currentUser && <Header>Welcome {userName}</Header>}
            {loading ?
                <Loader /> :
                <PhotosGrid>
                    {images.length && images.map((img, index) => {
                        return <Photo src={img.url} alt={img.name} key={img.name} onClickAction={() => openPreview(index)} />
                    })}
                </PhotosGrid>}
            <input type='file' id='upload-btn' accept={'.jpg,.png'} hidden onChange={onFileSelect} />
            <UploadButton htmlFor='upload-btn'><span className="material-icons">file_upload</span> Upload </UploadButton>
        </>
    )
}

export default Dashboard;