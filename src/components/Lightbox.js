import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Overlay } from './Modal';

const Root = styled.div`
    height: 100%;
    padding: 0px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const PreviewImage = styled.img`
    width:55%;
    height:55%;
    object-fit: contain;
`;

export default function Lightbox({ currentImage, onClose, onDelete, onNextAction, onPrevAction }) {

    async function onDownload() {
        const imgSrc = await fetch(currentImage.url);
        const blob = await imgSrc.blob();
        const imageURL = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = imageURL;
        link.download = currentImage.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Overlay>
            <span className="material-icons" onClick={onClose} style={{ color: 'grey', fontSize: '30px', position: 'absolute', top: '10px', right: '50px', cursor: 'pointer' }}>
                cancel
            </span>
            <span className="material-icons" onClick={onDelete} style={{ color: 'grey', fontSize: '30px', position: 'absolute', top: '10px', right: '100px', cursor: 'pointer' }}>
                delete
            </span>
            <span className="material-icons" onClick={onDownload} style={{ color: 'grey', fontSize: '30px', position: 'absolute', top: '12px', right: '150px', cursor: 'pointer' }}>
                download
            </span>
            <Root>
                <span className="material-icons" style={{ color: 'grey', fontSize: '65px', cursor: 'pointer', userSelect: 'none' }} onClick={onPrevAction}>
                    arrow_back_ios
                </span>
                <PreviewImage src={currentImage.url} />
                <span className="material-icons" style={{ color: 'grey', fontSize: '65px', cursor: 'pointer', userSelect: 'none' }} onClick={onNextAction}>
                    arrow_forward_ios
                </span>
            </Root>
        </Overlay>
    )
}

Lightbox.propTypes = {
    currrentImage: PropTypes.string,
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
    onPrevAction: PropTypes.func,
    onNextAction: PropTypes.func
};