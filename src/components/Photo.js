import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
    width: 100%;
    padding: 10px;
    object-fit: contain; 
    cursor: pointer;
    &:hover{
        transform: translateY(-5px);
    }
    transition: transform 0.3s;
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

