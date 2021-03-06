import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Overlay } from './Modal';
import Text from './Text';

const Root = styled.div`
    height: 100%;
    padding: 0px 15px;
    display: flex;
    justify-content:${props => props.hideArrows ? `center` : `space-between`};
    align-items: center;
`;

const Title = styled.div`
${Text}{
    position: absolute;
    top: 12px; 
    left: 25px;
}
    @media (max-width:600px){
        ${Text}{
        top: 90%;
        left: 25px;
        }
    }
`;

const PreviewImage = styled.img`
    width:55%;
    height:55%;
    object-fit: contain;
`;

export default function PreviewMode({ hideArrows, currentImage, onBackdropClick, onClose, onDelete, onNextAction, onPrevAction }) {

    async function onDownload(e) {
        e.stopPropagation();
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
        <Overlay onClick={(e) => onClose(e)}>
            <Title>
                <Text size={'x-base'} color={'grey'}>{currentImage.name}</Text>
            </Title>
            <span className="material-icons" onClick={(e) => onClose(e)} style={{ color: 'grey', fontSize: '30px', position: 'absolute', top: '10px', right: '50px', cursor: 'pointer' }}>
                close
            </span>
            <span className="material-icons" onClick={(e) => onDelete(e)} style={{ color: 'grey', fontSize: '30px', position: 'absolute', top: '10px', right: '100px', cursor: 'pointer' }}>
                delete
            </span>
            <span className="material-icons" onClick={(e) => onDownload(e)} style={{ color: 'grey', fontSize: '30px', position: 'absolute', top: '12px', right: '150px', cursor: 'pointer' }}>
                download
            </span>
            <Root hideArrows={hideArrows}>
                <span className="material-icons" style={{ display: !hideArrows ? 'block' : 'none', color: 'grey', fontSize: '65px', cursor: 'pointer', userSelect: 'none' }} onClick={(e) => onPrevAction(e)}>
                    arrow_back_ios
                </span>
                <PreviewImage src={currentImage.url} />
                <span className="material-icons" style={{ display: !hideArrows ? 'block' : 'none', color: 'grey', fontSize: '65px', cursor: 'pointer', userSelect: 'none' }} onClick={(e) => onNextAction(e)}>
                    arrow_forward_ios
                </span>
            </Root>
        </Overlay>
    )
}

PreviewMode.propTypes = {
    hideArrows: PropTypes.bool,
    currrentImage: PropTypes.string,
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
    onPrevAction: PropTypes.func,
    onNextAction: PropTypes.func
};