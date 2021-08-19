import React, { useEffect, useState } from 'react'
import PreviewMode from '../components/PreviewMode';
import { Loader } from '../components/Loader';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import NoImagesFound from '../components/NoImagesFound';
import Photo from '../components/Photo';
import { UploadButton } from '../components/UploadButton';
import { useAppState, useDispatch } from '../contexts/AppContext';
import { storage, db } from '../firebase/firebase-config';
import actionTypes from '../constants/action-types';
import Masonry from 'react-masonry-css';
import '../masonry.css';

const BREAKPOINTS = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const Dashboard = () => {
    const rootRef = storage.ref().child('photos');
    const [loading, setLoading] = useState(false);
    const [previewImageIndex, setPreviewIndex] = useState(null);
    const [isPreviewMode, togglePreviewMode] = useState(false);
    const [modalProps, setModalProps] = useState({});
    const { currentUser, photos } = useAppState();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchPhotos = () => {
        setLoading(true);
        const arr = [];
        db.collection('users').doc(currentUser.uid)
            .collection('photos').get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    arr.push(doc.data())
                });
                dispatch({ type: actionTypes.SET_PHOTOS, payload: arr });
                setLoading(false);
            })
            .catch(err => {
                console.log('Get Query Error', err);
            })
    }

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
            async () => {
                e.target.value = '';
                const url = await uploadTask.snapshot.ref.getDownloadURL();
                db.collection('users').doc(currentUser.uid)
                    .collection('photos').doc(file.name)
                    .set({
                        name: file.name,
                        url
                    })
                    .then(() => {
                        console.log('Document written successfully')
                        setModalProperties({
                            isVisible: true,
                            text: 'Upload Success',
                            buttonText: 'Okay',
                            onButtonClick: closeModal
                        });
                        fetchPhotos();
                    })
                    .catch((err) => {
                        console.log('DB error', err);
                    })
            });
    }

    const stopUpload = (task) => {
        if (task) {
            task.cancel();
            closeModal();
        }
    }

    const deletePhoto = (e) => {
        e.stopPropagation();
        const imgName = photos[previewImageIndex].name;
        const imgRef = storage.ref().child(`photos/${currentUser.uid}/${imgName}`);
        imgRef.delete()
            .then(() => {
                console.log('Deleted the photo');
                togglePreviewMode(false);
                deleteFromDB();
            })
            .catch((err) => {
                console.log('Error deleting the photo', err);
                setModalProperties({
                    isVisible: true,
                    text: `Delete Failed.Please try again`,
                    buttonText: 'Okay',
                    onButtonClick: closeModal
                });
            });
    }

    const deleteFromDB = () => {
        db.collection('users').doc(currentUser.uid)
            .collection('photos').doc(photos[previewImageIndex].name).delete()
            .then(() => {
                console.log('Doc deleted');
                const arr = photos;
                arr.splice(previewImageIndex, 1);
                dispatch({ type: actionTypes.SET_PHOTOS, payload: arr });
                togglePreviewMode(false);
            })
            .catch(err => {
                console.log('DB deletion Error', err);
            })
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

    const closePreview = (e) => {
        e.stopPropagation();
        togglePreviewMode(false);
    }

    const showNextImage = (e) => {
        e.stopPropagation();
        const nextIndex = previewImageIndex + 1;
        setPreviewIndex(nextIndex >= photos.length ? 0 : nextIndex);
    }

    const showPrevImage = (e) => {
        e.stopPropagation();
        const prevIndex = previewImageIndex - 1;
        setPreviewIndex(prevIndex < 0 ? photos.length - 1 : prevIndex);

    }

    const { isVisible, text, buttonText, onButtonClick } = modalProps;
    return (
        <>
            {isVisible ? <Modal text={text} buttonText={buttonText} onButtonClick={onButtonClick} /> : null}
            {isPreviewMode &&
                <PreviewMode
                    currentImage={photos[previewImageIndex]}
                    onClose={closePreview}
                    onNextAction={showNextImage}
                    onPrevAction={showPrevImage}
                    onDelete={deletePhoto}
                    hideArrows={photos.length < 2}
                />
            }
            <Navbar />
            {loading ?
                <Loader /> : <>
                    {photos.length ?
                        <Masonry
                            breakpointCols={BREAKPOINTS}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            {photos.map((img, index) => {
                                return <Photo src={img.url} alt={img.name} key={img.name} onClickAction={() => openPreview(index)} />
                            })}
                        </Masonry> : <NoImagesFound />}
                </>
            }
            <input type='file' id='upload-btn' accept={'.jpg,.png'} hidden onChange={onFileSelect} />
            <UploadButton htmlFor='upload-btn'><span className="material-icons">file_upload</span> Upload </UploadButton>
        </>
    )
}

export default Dashboard;