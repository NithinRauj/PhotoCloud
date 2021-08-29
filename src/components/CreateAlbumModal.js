import React from 'react';
import Button from './Button';
import Input from './Input';
import { Overlay, ModalRoot } from './Modal';
import Text from './Text';

const CreateAlbumModal = ({ onCreate, onCancel }) => {
    const titleRef = React.createRef();

    const onCreateAlbum = () => {
        const title = titleRef.current.value;
        if (title) {
            onCreate(title);
        }
    }

    return (
        <Overlay>
            <ModalRoot>
                <Text size={'base'}>Create Album</Text>
                <Input type='text' name='title' placeholder='Enter Album Name' reference={titleRef} />
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                    <Button width={'150px'} height={'40px'} text={'Create'} bgColor={'darkAccent'} onClick={onCreateAlbum} />
                    <Button width={'150px'} height={'40px'} text={'Cancel'} bgColor={'darkAccent'} onClick={onCancel} />
                </div>
            </ModalRoot>
        </Overlay>
    )
}


export default CreateAlbumModal
