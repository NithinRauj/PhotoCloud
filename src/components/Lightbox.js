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

export default function Lightbox({ currentImage, onClose, onNextAction, onPrevAction }) {
    return (
        <Overlay>
            <span className="material-icons" onClick={onClose} style={{ color: 'grey', fontSize: '30px', position: 'absolute', top: '10px', right: '40px', cursor: 'pointer' }}>
                cancel
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
    onClick: PropTypes.func,
    onPrevAction: PropTypes.func,
    onNextAction: PropTypes.func
};