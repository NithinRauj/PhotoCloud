import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const PhotosGrid = styled.div`
    margin: 25px 25px 25px;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(350px,1fr));
    grid-gap: 5px;
`;

const Image = styled.img`
    width: 350px;
    height: 350px;
    border-radius: 8px;
    overflow: hidden;
    object-fit: contain;
    cursor: pointer;
    &:hover{
        transform: scale(1.1,1.1)
    }
    transition: transform 0.5s;
`;

const Photo = ({ src, onClickAction }) => {
    return (
        <Image src={src} onClick={onClickAction} />
    )
}

Photo.propTypes = {
    src: PropTypes.string,
    onClickAction: PropTypes.func
}

export default Photo

